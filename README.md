
<p align="center">
  <img src="frontend/src/assets/banner.png" alt="Logo" width="400">
</p>

## Empowering Truth: Delivering Clarity in a World of Disinformation

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
  - API Development: Flask
  - Model Deployment: TensorFlow/PyTorch
  - Google FactCheck Claim Search API Key
  - Database and Authentication: Node.js with Express

- **Frontend**:
  - Node.js
  - React + Vite

## Development Status

FactGuard has been successfully developed and all core functionalities — including fake news detection, claim verification, and user management — have been fully implemented and tested. However, due to the high resource requirements of the DL models, the application cannot currently be deployed on free-tier platforms. 

As a result, FactGuard is only accessible to users connected to the same local network where the application is hosted. The system remains ready for deployment in more robust environments that support large-scale AI workloads.

## License

This project is licensed under the MIT License.

---

For more information, contact [Sergio Cuenca Núñez](https://www.linkedin.com/in/sergio-cuenca-núñez-b8a391223/).
