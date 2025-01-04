
<p align="center">
  <img src="frontend/src/assets/banner.png" alt="Logo" width="400">
</p>

## FactGuard

### Empowering Truth: Delivering Clarity in a World of Misinformation
FactGuard is a web application designed to detect fake news and verify claims using advanced AI techniques. It combines **Machine Learning (ML)** and **Deep Learning (DL)** models to analyze content, identify fake news, and perform real-time claim verification. The platform integrates models like **BERT** and **LSTM** for detection, alongside **Decision Trees**, **Random Forest**, and **XGBoost** for ML-based classification. Additionally, the system features a backend database for storing user information, detections, and claims, ensuring a robust and scalable solution for users, journalists, and analysts.

## Features

- **Fake News Detection (FactGuard Detect)**: 
  - Utilizes ML models (Decision Trees, Random Forest, XGBoost) for efficient classification.
  - Deploys DL models (LSTM, BERT) for advanced analysis of news articles.
- **Claim Verification (FactGuard Verify)**: 
  - Integrates with the Google FactCheck Claim Search API for real-time verification of statements and claims.
- **Database Integration**: 
  - Backend database stores user profiles, detection records, and verified claims.
- **Advanced Authentication**:
  - Secured login and user management implemented with JavaScript.
- **Interactive Interface**: 
  - Built with React and Vite for a modern and responsive user experience.
- **API-Exposed Backend**:
  - Python-based backend (Python 3.9.21) exposes detection and verification endpoints via Flask.
  - Supports server-side operations with Node.js (server.js).

## Prerequisites

- **Backend**:
  - Python 3.9.21
  - Flask (API Development)
  - TensorFlow/PyTorch (Model Deployment)
  - Google FactCheck Claim Search API Key
  - Node.js with Express (Database and Authentication)
- **Frontend**:
  - Node.js
  - React + Vite

## Currently Work in Progress

This project is currently in a highly advanced stage of development and is nearing production readiness. The team is actively preparing the final features and deployment processes for a stable release.

## Deployment

FactGuard will be hosted on **Render**, ensuring high availability and performance for end-users.

## License

This project is licensed under the MIT License.

---

For more information, contact [Sergio Cuenca Núñez](https://www.linkedin.com/in/sergio-cuenca-núñez-b8a391223/).
