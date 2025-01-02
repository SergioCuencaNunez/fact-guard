from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Initialize your API key
API_KEY = "AIzaSyBnQqmXmGZwMVKt2l1RfJO4IQ9P8YtZErQ"

# Supported languages
LANGUAGE_MAP = {
    "en": "English",
    "es": "Spanish",
}

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
                url = review.get("url", "No URL")

                results.append({
                    "Claim": text,
                    "Claimant": claimant,
                    "Publisher": publisher,
                    "Rating": rating,
                    "URL": url
                })

        if results:
            return {"success": True, "data": results}
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
