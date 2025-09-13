#!/usr/bin/env python3
from flask import Flask, redirect, url_for, request, send_from_directory, jsonify
# Flask-Login removed - no authentication required
import os
from models import db, User
# Google auth import removed - no authentication

app = Flask(__name__, static_folder='.', static_url_path='')
# Require proper secret key in production
secret_key = os.environ.get('FLASK_SECRET_KEY')
if not secret_key:
    if os.environ.get('REPLIT_DEV_DOMAIN'):
        # Development environment
        secret_key = 'dev-secret-change-in-production-replit-development'
    else:
        raise ValueError("FLASK_SECRET_KEY environment variable is required")
app.secret_key = secret_key

# Database configuration - store in instance folder (gitignored)
import os
os.makedirs('instance', exist_ok=True)
db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'instance', 'users.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db.init_app(app)
# Authentication system removed - no login required

# Register blueprints
# Google auth blueprint removed - no authentication

# User loader removed - no authentication

# Create database tables
with app.app_context():
    db.create_all()




# Cache control for static files
@app.after_request
def after_request(response):
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response


# Health check endpoint for Cloud Run
@app.route('/health')
def health_check():
    """Health check endpoint for deployment health checks"""
    return jsonify({'status': 'healthy', 'service': 'Apex Separatist Consortium'}), 200

# API endpoints
@app.route('/api')
def api_status():
    """Basic API status endpoint"""
    return jsonify({'status': 'online', 'service': 'Apex Separatist Consortium'})

@app.route('/api/user')
def api_user():
    # Authentication removed - all users are now considered unauthenticated
    return jsonify({'authenticated': False})


# Redirect old signin route to new Google login
@app.route('/signin')
def signin():
    return redirect(url_for('google_auth.login'))



# Serve static files with proper routing
@app.route('/')
def index():
    """Root endpoint with error handling for health checks"""
    try:
        return send_from_directory('.', 'index.html')
    except Exception as e:
        # Fallback response for health checks if index.html is missing
        return jsonify({'status': 'healthy', 'service': 'Apex Separatist Consortium'}), 200

@app.route('/access.html')
def access_page():
    return send_from_directory('.', 'access.html')

# Concord routes removed - now deployed as separate app at concord-of-unity.org


@app.route('/<path:filename>')
def serve_static(filename):
    # Security: Block access to sensitive paths
    blocked_paths = ['instance/', '.git/', '__pycache__/', '.env', 'server.py', 'models.py', 'google_auth.py']
    if any(filename.startswith(path) or filename.endswith('.py') or filename.endswith('.db') for path in blocked_paths):
        return 'Access denied', 403
    
    # Handle faction pages - allow all access
    if filename.startswith('factions/') and filename.endswith('.html'):
        try:
            return send_from_directory('.', filename)
        except:
            return send_from_directory('.', '404.html'), 404

    # Handle other safe static files
    allowed_extensions = ['.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp']
    if any(filename.endswith(ext) for ext in allowed_extensions):
        try:
            return send_from_directory('.', filename)
        except:
            # File doesn't exist, serve 404
            try:
                return send_from_directory('.', '404.html'), 404
            except:
                return 'File not found', 404
    
    # Block everything else
    return 'Access denied', 403


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Serving at http://0.0.0.0:{port}")
    
    # Check OAuth configuration
    try:
        from google_auth import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
        if GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET:
            print("✓ Google OAuth configured with Replit integration")
        else:
            print("⚠ OAuth credentials missing")
    except:
        print("⚠ OAuth not properly configured")
    
    app.run(host='0.0.0.0', port=port, debug=False)
