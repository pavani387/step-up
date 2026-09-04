import os
import streamlit as st
import streamlit.components.v1 as components

# Set Streamlit page configuration
st.set_page_config(
    page_title="StepUp — Learn. Build. Apply. Grow.",
    page_icon="🚀",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Hide Streamlit header, footer, and remove padding for full-screen seamless app experience
st.markdown("""
<style>
    /* Hide Streamlit chrome */
    #MainMenu {visibility: hidden;}
    header {visibility: hidden;}
    footer {visibility: hidden;}
    div[data-testid="stToolbar"] {visibility: hidden;}
    div[data-testid="stDecoration"] {visibility: hidden;}
    div[data-testid="stStatusWidget"] {visibility: hidden;}
    
    /* Remove padding around content */
    .block-container {
        padding: 0 !important;
        margin: 0 !important;
        max-width: 100% !important;
    }
    
    /* Ensure component iframe takes full viewport */
    iframe {
        width: 100% !important;
        height: 100vh !important;
        min-height: 100vh !important;
        border: none !important;
    }
</style>
""", unsafe_allow_html=True)

# Locate production build folder
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.join(CURRENT_DIR, "dist")

if not os.path.exists(DIST_DIR):
    st.error("Build directory 'dist' not found. Please run 'npm run build' before launching Streamlit.")
else:
    # Declare and mount StepUp React SPA as a Streamlit Custom Component
    stepup_app = components.declare_component("stepup_app", path=DIST_DIR)
    stepup_app()
