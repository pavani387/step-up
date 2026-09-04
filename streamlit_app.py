import streamlit as st
import streamlit.components.v1 as components
import os
import sys

# 1. Streamlit Page Configuration
st.set_page_config(
    page_title="StepUp — Learn. Build. Apply. Grow.",
    page_icon="🚀",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# 2. Seamless Fullscreen Clean Styling
st.markdown("""
    <style>
    /* Hide Streamlit default decoration & margins */
    #MainMenu {visibility: hidden;}
    header {visibility: hidden;}
    footer {visibility: hidden;}
    
    .block-container {
        padding-top: 0rem !important;
        padding-bottom: 0rem !important;
        padding-left: 0rem !important;
        padding-right: 0rem !important;
        max-width: 100% !important;
    }
    
    iframe {
        border: none !important;
        width: 100% !important;
        min-height: 100vh !important;
        display: block;
    }

    [data-testid="stSidebar"] {
        background-color: #0C1435 !important;
        color: white !important;
    }
    [data-testid="stSidebar"] * {
        color: #E2E8F0 !important;
    }
    [data-testid="stSidebar"] h1, [data-testid="stSidebar"] h2, [data-testid="stSidebar"] h3 {
        color: #FFFFFF !important;
    }
    </style>
""", unsafe_allow_html=True)

# 3. Streamlit Sidebar Controls & Cloud Deployment Guide
with st.sidebar:
    st.markdown("### 🚀 StepUp Career Platform")
    st.markdown("**Learn. Build. Apply. Grow.**")
    st.markdown("---")
    
    st.markdown("#### ☁️ Streamlit Cloud Deployment")
    st.success("● Deployment Ready")
    
    with st.expander("📖 How to Deploy to Streamlit Cloud", expanded=False):
        st.markdown("""
        **3 Simple Steps to Deploy for Free:**
        1. **Push to GitHub**: Push this repository to your GitHub account (`github.com/your-username/stepup`).
        2. **Open Streamlit Cloud**: Go to [share.streamlit.io](https://share.streamlit.io/) and sign in with GitHub.
        3. **New App**:
           - **Repository**: Select your `stepup` repository
           - **Branch**: `main`
           - **Main file path**: `streamlit_app.py`
           - Click **Deploy!** 🎉
        """)
    
    st.markdown("---")
    st.markdown("#### ⚙️ Display Settings")
    viewport_height = st.slider("App Viewport Height (px)", min_value=800, max_value=2400, value=1100, step=50)
    
    st.markdown("---")
    st.markdown("#### 🛡️ Verified Platform Features")
    st.markdown("""
    - ✅ **Left-Side Navigation**
    - ✅ **Google Account Selection** (`media_1788367337459.png`)
    - ✅ **1-Click Photo Upload**
    - ✅ **Gmail OTP Dispatch Simulator**
    - ✅ **In-Demand Resume Skill Analyzer**
    - ✅ **Assessment Sandboxes & Scorecards**
    - ✅ **Recruiter Job Portal**
    """)
    st.markdown("---")
    st.caption("Powered by Streamlit & React")

# 4. Load the Pre-Packaged Standalone StepUp App
base_dir = os.path.dirname(os.path.abspath(__file__))
standalone_path = os.path.join(base_dir, "dist", "standalone.html")

# Auto-bundle if standalone file is missing
if not os.path.exists(standalone_path):
    try:
        from bundle_standalone import create_standalone_html
        create_standalone_html(dist_dir=os.path.join(base_dir, "dist"), output_file=standalone_path)
    except Exception as e:
        st.error(f"Error bundling application: {e}")

if os.path.exists(standalone_path):
    with open(standalone_path, "r", encoding="utf-8") as f:
        stepup_html = f.read()
    
    # Render the complete StepUp application inside Streamlit
    components.html(stepup_html, height=viewport_height, scrolling=True)
else:
    st.error("Could not find compiled StepUp distribution. Please run `npm run build` and `python bundle_standalone.py`.")
