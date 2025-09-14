# Concord of Unity - Enemy Territory

A standalone Flask application representing the enemy faction "Concord of Unity" in the Apex Separatist Consortium universe.

## Deployment Instructions

This site is designed to be deployed on Replit with a custom domain: **concord-of-unity.org**

### Prerequisites
- Replit account with deployment access
- Custom domain: concord-of-unity.org

### Deployment Steps

1. **Create New Replit Project**
   - Upload this entire `concord_site` directory as a new Replit project
   - Ensure `main.py` is in the root directory

2. **Configure Reserved VM Deployment**
   - Click "Deploy" in your Replit workspace
   - Select "Reserved VM" deployment type
   - Set run command: `gunicorn --bind=0.0.0.0:$PORT --reuse-port main:app`

3. **Set Up Custom Domain**
   - In Deployment settings, go to "Settings" tab
   - Click "Link a domain" or "Manually connect from another registrar"
   - Add: `concord-of-unity.org` and `www.concord-of-unity.org`
   - Follow DNS setup instructions provided by Replit

### Important Configuration

- **Return Link**: Update the "Return to Consortium Space" link in `index.html` to point to your main Consortium domain
- **Port**: The app runs on port 5000 (configured for Replit)
- **Security**: Sensitive files are blocked from public access

### File Structure
```
concord_site/
├── main.py              # Flask server
├── index.html          # Main page
├── concord_style.css   # Enemy territory styling
├── concord_script.js   # Territory-specific JavaScript
├── images/             # Asset files
├── requirements.txt    # Python dependencies
├── pyproject.toml     # Project configuration
└── .gitignore         # Git ignore rules
```

### Enemy Territory Features
- Golden color scheme with warning banners
- Pulsing enemy territory alerts
- Independent navigation and styling
- Territory-specific API endpoints

This creates a truly immersive experience where users "travel" between different domains representing hostile territories in the fictional universe.