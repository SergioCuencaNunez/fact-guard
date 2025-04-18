import os
import re
import requests
import pickle
import jwt
import nltk
from datetime import datetime
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from functools import wraps
from tensorflow.keras.preprocessing.sequence import pad_sequences
import tensorflow as tf
from tensorflow.keras.models import load_model
from transformers import AutoTokenizer, AdamWeightDecay
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

current_dir = os.path.dirname(__file__)
api_key_path = os.path.join(current_dir, "api_key.txt")
with open(api_key_path, "r") as file:
    API_KEY = file.read().strip()

SECRET_KEY = "secret_key"

# Supported languages
LANGUAGE_MAP = {
    "en": "English",
    "es": "Spanish",
}

nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt')

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

def load_models():
    global pruned_tree, rf_cv, xgb_model, lstm_model, bert_model

    with open('../models/dt_pruned_model.pkl', 'rb') as file:
        pruned_tree = pickle.load(file)
    with open('../models/rf_cv_model.pkl', 'rb') as file:
        rf_cv = pickle.load(file)
    with open('../models/xgboost_model.pkl', 'rb') as file:
        xgb_model = pickle.load(file)
    with open('../models/lstm_model.pkl', 'rb') as file:
        lstm_model = pickle.load(file)

    bert_model = load_model('../models/bert_model', custom_objects={'AdamWeightDecay': AdamWeightDecay})

load_models()

def load_tokenizers():
    global vectorizer, lstm_tokenizer, bert_tokenizer

    with open('../preprocessing_artifacts/tfidf_vectorizer.pkl', 'rb') as file:
        vectorizer = pickle.load(file)
    with open('../preprocessing_artifacts/lstm_tokenizer.pkl', 'rb') as file:
        lstm_tokenizer = pickle.load(file)

    bert_tokenizer = AutoTokenizer.from_pretrained("../preprocessing_artifacts/bert_tokenizer")

load_tokenizers()

def clean_text(text):
    # Remove extra whitespaces
    text = re.sub(r'\s+', ' ', text, flags=re.I)

    # Remove special characters
    text = re.sub(r'\W', ' ', str(text))  

    # Remove single characters
    text = re.sub(r'\s+[a-zA-Z]\s+', ' ', text)

    # Remove not alphabetical characters
    text = re.sub(r'[^a-zA-Z\s]', ' ', text)
    
    # Convert to lowercase
    text = text.lower()
    
    # Lemmatization
    tokens = word_tokenize(text)
    tokens = [lemmatizer.lemmatize(word) for word in tokens if word not in stop_words]

    # Removal of Stop Words
    tokens = [word for word in tokens if len(word) > 3]
    
    return tokens

def verify_token(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return jsonify({"error": "Authorization header missing"}), 403
        
        token = auth_header.split(" ")[1]
        try:
            decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            request.user = decoded_token
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
        
        return func(*args, **kwargs)
    return wrapper

def predict_news(news_text, confidence_threshold):
    tokens = clean_text(news_text)
    cleaned_text = ' '.join(tokens)

    # TF-IDF for ML models
    tfidf_features = vectorizer.transform([cleaned_text])

    # Tokenization and padding for LSTM
    max_sequence_length = 150
    lstm_sequence = lstm_tokenizer.texts_to_sequences([cleaned_text])
    lstm_padded = pad_sequences(lstm_sequence, maxlen=max_sequence_length)

    # Tokenization for BERT
    bert_inputs = bert_tokenizer(cleaned_text, return_tensors = "tf", padding = "max_length", truncation = True, max_length=512)

    # Predict with ML models
    dt_pred = pruned_tree.predict_proba(tfidf_features)[0]
    rf_pred = rf_cv.predict_proba(tfidf_features)[0]
    xgb_pred = xgb_model.predict_proba(tfidf_features)[0]

    # Predict with LSTM
    lstm_pred_probs = lstm_model.predict(lstm_padded)[0]

    # Predict with BERT
    bert_predictions = bert_model.predict(dict(bert_inputs))
    bert_pred_logits = bert_predictions['logits'][0]
    bert_pred_probs = tf.nn.softmax(bert_pred_logits).numpy()

    predictions = {
        "Decision Tree": {"Fake": dt_pred[0] * 100, "True": dt_pred[1] * 100},
        "Random Forest": {"Fake": rf_pred[0] * 100, "True": rf_pred[1] * 100},
        "XGBoost": {"Fake": xgb_pred[0] * 100, "True": xgb_pred[1] * 100},
        "LSTM": {"Fake": lstm_pred_probs[0] * 100, "True": lstm_pred_probs[1] * 100},
        "BERT": {"Fake": bert_pred_probs[0] * 100, "True": bert_pred_probs[1] * 100}
    }

    f1_scores = {
        "Decision Tree": 0.9357,
        "Random Forest": 0.9674,
        "XGBoost": 0.9792,
        "LSTM": 0.9671,
        "BERT": 0.9936,
    }

    detection_results = []
    weighted_votes = {"True": 0.0, "Fake": 0.0, "Uncertain": 0.0}

    for model, probs in predictions.items():
        true_prob = probs["True"]
        fake_prob = probs["Fake"]
        prediction = "True" if true_prob >= fake_prob else "Fake"
        if max(probs.values()) < confidence_threshold:
            prediction = "Uncertain"

        detection_results.append({
            "Model": model,
            "True Probability": f"{true_prob:.2f}%",
            "Fake Probability": f"{fake_prob:.2f}%",
            "Prediction": prediction
        })

        # Add weighted vote
        weight = f1_scores.get(model, 1.0)
        weighted_votes[prediction] += weight

    if detection_results:
        final_prediction = max(weighted_votes, key=weighted_votes.get)
        
        return {
            "success": True,
            "detections": detection_results,
            "final_prediction": final_prediction
        }
    else:
        return {
            "success": False,
            "message": "No detection results available for the given input.",
        }

# Prediction endpoint
@app.route("/predict", methods=["POST"])
@verify_token
def predict():
    data = request.get_json()
    news_text = data.get("news_text")
    confidence_threshold = data.get("confidence_threshold")

    if not news_text:
        return jsonify({"success": False, "error": "News text is required."}), 400

    if not (0 <= confidence_threshold <= 100):
        return jsonify({"success": False, "error": "Confidence threshold must be between 0 and 100."}), 400

    result = predict_news(news_text, confidence_threshold)

    return jsonify(result)

def search_fact_check_claims(api_key, query, language_code="en"):
    url = "https://factchecktools.googleapis.com/v1alpha1/claims:search"
    params = {
        "key": api_key,
        "query": query,
        "languageCode": language_code,
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()

        claims = data.get("claims", [])
        results = []

        for claim in claims:
            text = claim.get("text", "No text available")
            claimant = claim.get("claimant", "Unknown")
            review = claim.get("claimReview", [])[0] if claim.get("claimReview") else None

            if review:
                publisher = review.get("publisher", {}).get("name", "Unknown publisher")
                rating = review.get("textualRating", "No rating")
                review_date = review.get("reviewDate", "No date")
                url = review.get("url", "No URL")

                results.append({
                    "Claim": text,
                    "Claimant": claimant,
                    "Publisher": publisher,
                    "Rating": rating,
                    "Date": review_date,
                    "URL": url
                })

        if results:
            results = [r for r in results if r["Date"] != "No date"]
            results.sort(key=lambda x: datetime.strptime(x["Date"].split("T")[0], "%Y-%m-%d"), reverse=True)
            top_results = results[:3]
            return {"success": True, "data": top_results}
        else:
            language_name = LANGUAGE_MAP.get(language_code, language_code)
            return {
                "success": False,
                "message": f"No claims matching '{query}' were found in {language_name}.",
            }


    except requests.exceptions.RequestException as e:
        return {"success": False, "error": str(e)}

# Fact-checking via Google Fact Check Tools API
@app.route("/factcheck", methods=["POST"])
@verify_token
def fact_check():
    data = request.get_json()
    query = data.get("query")
    language_code = data.get("language", "en")

    if not query:
        return jsonify({"success": False, "error": "Query is required."}), 400

    results = search_fact_check_claims(API_KEY, query, language_code)
    return jsonify(results)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002)
