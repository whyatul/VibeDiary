## 📝 Vibe Diary

Using a machine learning model designed to analyze the **sentiment** of diary-style text entries. This model helps users understand their emotional tone over time by classifying entries as **positive**, **negative**, or **neutral**.

---

## 📌 Features

* 🧠 Natural Language Processing (NLP) based sentiment classification
* 🧪 Trained on real-life journal/diary datasets and/or augmented datasets
* 📊 Outputs sentiment label and optional confidence score
* 📈 Helpful for mood tracking, journaling apps, mental wellness analysis, etc.

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/VibeDiary.git
cd VibeDiary
```

---

## 🛠️ Technology Stack

### Frontend
* **React.js** - Modern UI library for building interactive interfaces
* **Vite** - Fast build tool and development server
* **Tailwind CSS** - Utility-first CSS framework for styling
* **Firebase** - Backend-as-a-Service for authentication and data storage
* **ESLint** - Code linting and formatting

### Backend & ML
* **Python 3.7+** - Core programming language for ML
* **Scikit-learn / TensorFlow / PyTorch** - Machine learning frameworks
* **NLTK / spaCy** - Natural language processing libraries
* **Pandas / NumPy** - Data manipulation and analysis
* **Jupyter Notebooks** - Interactive development and experimentation

### Development Tools
* **Git** - Version control
* **PostCSS** - CSS processing
* **npm/yarn** - Package management for frontend

---

## 🛠️ Installation

### Prerequisites
* **Node.js 16+** and **npm** (for React frontend)
* **Python 3.7+** (for ML backend)

### Frontend Setup

1. Install frontend dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

### Backend Setup

1. Navigate to the ML directory:
```bash
cd diary_analysis
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Run the ML backend:
```bash
python main.py
```

### Full Stack Development

For full-stack development, run both servers concurrently:

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd diary_analysis && python main.py
```

---

## 📂 Project Structure

```
📦 VibeDiary/
├── 🎨 Frontend (React.js)
│   ├── public/                 # Static files
│   │   ├── vite.svg           # Vite logo
│   │   └── index.html         # HTML template
│   ├── src/                   # React source code
│   │   ├── components/        # Reusable UI components
│   │   │   └── Navbar.jsx     # Navigation component
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx       # Landing page
│   │   │   ├── Dashboard.jsx  # Main dashboard
│   │   │   ├── Record.jsx     # Diary entry recording
│   │   │   └── History.jsx    # Entry history & analytics
│   │   ├── context/           # React context providers
│   │   │   └── ThemeContext.jsx # Theme management
│   │   ├── hooks/             # Custom React hooks
│   │   │   └── useVideoRecorder.js # Video recording hook
│   │   ├── firebase/          # Firebase configuration
│   │   │   └── config.js      # Firebase setup
│   │   ├── assets/            # Static assets
│   │   │   └── react.svg      # React logo
│   │   ├── App.jsx            # Main App component
│   │   ├── App.css            # App styles
│   │   ├── main.jsx           # React entry point
│   │   └── index.css          # Global styles
│   ├── package.json           # Frontend dependencies
│   ├── package-lock.json      # Lock file
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind CSS config
│   ├── postcss.config.js      # PostCSS config
│   ├── eslint.config.js       # ESLint configuration
│   └── index.html             # Entry HTML file
│
├── 🧠 ML Backend (Python)
│   └── diary_analysis/        # Machine Learning module
│       ├── data/              # Training & sample data
│       ├── models/            # Saved ML models
│       ├── notebooks/         # Jupyter notebooks for exploration
│       ├── src/               # Core ML code
│       │   ├── preprocess.py  # Text cleaning & tokenization
│       │   ├── train.py       # Model training script
│       │   ├── predict.py     # Sentiment prediction
│       │   └── utils.py       # Helper functions
│       └── main.py            # Main ML application entry
│
├── �️ Database Structure (Firebase Firestore)
│   ├── users/                 # User collection
│   │   └── {userId}/          # Individual user document
│   │       ├── profile        # User profile data
│   │       ├── settings       # User preferences & settings
│   │       └── entries/       # Sub-collection of diary entries
│   │           └── {entryId}/ # Individual entry document
│   │               ├── content         # Entry text content
│   │               ├── timestamp       # Creation date/time
│   │               ├── sentiment       # ML analysis results
│   │               ├── confidence      # Sentiment confidence score
│   │               ├── mood_tags       # User-selected mood tags
│   │               ├── media_urls      # Video/audio recordings
│   │               └── metadata        # Additional entry data
│   │
│   ├── analytics/             # Analytics collection
│   │   └── {userId}/          # User-specific analytics
│   │       ├── daily_stats    # Daily mood summaries
│   │       ├── weekly_trends  # Weekly sentiment trends
│   │       ├── monthly_summary # Monthly analysis
│   │       └── patterns       # Detected emotional patterns
│   │
│   └── app_data/              # Application-wide data
│       ├── sentiment_models   # ML model metadata
│       ├── mood_categories    # Predefined mood categories
│       └── app_settings       # Global app configuration
│
├── 🗄️ Alternative Database Schemas
│   ├── PostgreSQL/            # Relational database option
│   │   ├── schema.sql         # Database schema definition
│   │   ├── migrations/        # Database migration files
│   │   ├── seeds/             # Sample data for development
│   │   └── queries/           # Common SQL queries
│   │
│   └── MongoDB/               # NoSQL document database option
│       ├── schemas/           # Mongoose schemas
│       ├── collections.js     # Collection definitions
│       └── indexes.js         # Database indexes
│
├── �📄 Configuration & Documentation
│   ├── .git/                  # Git repository
│   ├── .gitignore            # Git ignore rules
│   ├── README.md             # Project documentation
│   └── requirements.txt      # Python dependencies (to be created)
```

---

## 🧪 Example Usage

```python
from src.predict import predict_sentiment

entry = "I feel so exhausted today, everything went wrong."
label, confidence = predict_sentiment(entry)

print(f"Sentiment: {label} (Confidence: {confidence:.2f})")
```

---

## 🔍 Model Details

* **Model Type:** Logistic Regression / LSTM / BERT (Choose your actual model)
* **Preprocessing:** Lowercasing, punctuation removal, lemmatization
* **Training Data:** Collected or scraped diary/journal-style datasets
* **Metrics:** Accuracy, F1-Score, Precision, Recall

---

## 📈 Performance

| Class    | Precision | Recall | F1-score |
| -------- | --------- | ------ | -------- |
| Positive | 0.87      | 0.85   | 0.86     |
| Neutral  | 0.80      | 0.78   | 0.79     |
| Negative | 0.84      | 0.86   | 0.85     |

> *Note: Results may vary depending on model version and dataset.*

---

## 🖥️ Deployment

### Frontend Deployment
Build and deploy the React app:

```bash
npm run build
```

Deploy to platforms like:
* **Vercel** - Recommended for React apps
* **Netlify** - Static site hosting
* **Firebase Hosting** - Google's hosting platform

### Backend Deployment
Deploy the ML backend to:
* **Heroku** - Easy Python app deployment
* **Railway** - Modern deployment platform
* **Google Cloud Platform** - Scalable cloud hosting
* **AWS EC2** - Amazon's cloud computing platform

### Full-Stack Deployment
For complete deployment, consider:
* **Docker containers** for consistent environments
* **Kubernetes** for orchestration
* **CI/CD pipelines** with GitHub Actions

---

## 📘 Use Cases

* 🧘‍♀️ Mental wellness and therapy apps
* 📓 Personal journaling software
* 📊 Mood trend analysis over time
* 🧑‍💻 NLP research and emotion detection

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## ✨ Acknowledgements

* HuggingFace Transformers
* NLTK / spaCy
* Sentiment140 or Emotion Dataset
* Diary/journal entry inspiration from \[your data source]

