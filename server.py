#!/usr/bin/env python3
from flask import Flask, redirect, url_for, request, send_from_directory, jsonify
from flask_login import LoginManager, current_user
import os
from models import db, User
from google_auth import google_auth

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
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'google_auth.login'

# Register blueprints
app.register_blueprint(google_auth)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

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


# API route to get user info
@app.route('/api/user')
def api_user():
    if current_user.is_authenticated:
        return jsonify({
            'authenticated': True,
            'user': {
                'name': current_user.username,
                'email': current_user.email,
                'picture': ''  # Can be added later if needed
            }
        })
    return jsonify({'authenticated': False})


# Redirect old signin route to new Google login
@app.route('/signin')
def signin():
    return redirect(url_for('google_auth.login'))

# Protected classified page - requires authentication
@app.route('/classified.html')
def classified():
    if not current_user.is_authenticated:
        return redirect(url_for('google_auth.login'))
    return send_from_directory('.', 'classified.html')


# Serve static files with proper routing
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')


@app.route('/<path:filename>')
def serve_static(filename):
    # Security: Block access to sensitive paths
    blocked_paths = ['instance/', '.git/', '__pycache__/', '.env', 'server.py', 'models.py', 'google_auth.py']
    if any(filename.startswith(path) or filename.endswith('.py') or filename.endswith('.db') for path in blocked_paths):
        return 'Access denied', 403
    
    # Handle faction pages
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
