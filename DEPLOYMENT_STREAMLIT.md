# 🚀 StepUp Platform — Streamlit Deployment Guide

This guide provides instructions to run and deploy **STEPUP ("Learn. Build. Apply. Grow.")** using **Streamlit**.

---

## ⚡ Option 1: Run Locally via Streamlit

To run the Streamlit app on your computer:

```bash
# Navigate to the project directory
cd C:\Users\kondr\.gemini\antigravity\scratch\stepup-app

# Launch the Streamlit application
python -m streamlit run streamlit_app.py
```

- **Local Streamlit URL**: [http://localhost:8501](http://localhost:8501)
- **Vite Dev Server URL**: [http://localhost:5173](http://localhost:5173)

---

## ☁️ Option 2: Deploy to Streamlit Community Cloud (Free Public URL)

You can host your StepUp app on the cloud for free with a public shareable URL (e.g., `https://stepup-career.streamlit.app/`).

### Step 1: Push Project to GitHub

1. Open your terminal in the project directory:
   ```bash
   cd C:\Users\kondr\.gemini\antigravity\scratch\stepup-app
   git init
   git add .
   git commit -m "Initial commit: StepUp Career Platform with Streamlit deployment"
   ```
2. Create a new repository on [GitHub](https://github.com/new) named `stepup-app`.
3. Link and push your code:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/stepup-app.git
   git push -u origin main
   ```

### Step 2: Deploy on Streamlit Cloud

1. Go to **[share.streamlit.io](https://share.streamlit.io/)** and sign in with your GitHub account.
2. Click the **"New app"** button.
3. Configure deployment settings:
   - **Repository**: `YOUR_GITHUB_USERNAME/stepup-app`
   - **Branch**: `main`
   - **Main file path**: `streamlit_app.py`
   - **App URL** (optional): customize your subdomain e.g., `stepup-career`
4. Click **"Deploy!"** 🎉

Streamlit will automatically install dependencies from `requirements.txt` and serve your complete **STEPUP** application online with 24/7 uptime!

---

## 📦 Deployment Files Included

- `streamlit_app.py`: Streamlit entry point that serves the StepUp platform with full-screen layout.
- `bundle_standalone.py`: Packager that bundles the React client into a self-contained distribution for Streamlit.
- `requirements.txt`: Python package dependencies (`streamlit>=1.30.0`).
- `.streamlit/config.toml`: Streamlit theme settings matching the official StepUp brand palette.
- `dist/standalone.html`: Compiled production bundle containing the complete StepUp application.
