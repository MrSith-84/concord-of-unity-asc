#!/usr/bin/env python3
from flask import Flask, send_from_directory, jsonify
import os
from pathlib import Path

# Get the directory containing this file (concord_site)
base_dir = Path(__file__).parent

app = Flask(__name__)

# Cache control for static files
@app.after_request
def after_request(response):
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

# API endpoints
@app.route('/api')
def api_status():
    """Basic API status endpoint"""
    return jsonify({'status': 'online', 'service': 'Concord of Unity'})

@app.route('/api/territory')
def api_territory():
    """Territory identification endpoint"""
    return jsonify({
        'territory': 'Concord of Unity',
        'status': 'Enemy Territory',
        'access_level': 'Public'
    })

# Main routes
@app.route('/')
def index():
    return send_from_directory(str(base_dir), 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    # Security: Block access to sensitive paths and files
    blocked_paths = ['.git/', '__pycache__/', '.env', 'main.py', '.gitignore', 'requirements.txt', 'pyproject.toml', 'README.md']
    blocked_extensions = ['.py', '.pyc', '.pyo', '.db', '.log', '.txt', '.md', '.toml']
    
    # Block sensitive paths and files
    if any(filename.startswith(path) for path in blocked_paths):
        return 'Access denied', 403
    
    # Block sensitive file extensions
    if any(filename.endswith(ext) for ext in blocked_extensions):
        return 'Access denied', 403
    
    # Block dotfiles (hidden files)
    if filename.startswith('.') or '/.' in filename:
        return 'Access denied', 403
    
    # Only allow specific safe file types
    allowed_extensions = ['.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp']
    if any(filename.endswith(ext) for ext in allowed_extensions):
        try:
            return send_from_directory(str(base_dir), filename)
        except:
            return 'File not found', 404
    
    # Block everything else
    return 'Access denied', 403

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Concord of Unity serving at http://0.0.0.0:{port}")
    print("Territory: Enemy Space")
    app.run(host='0.0.0.0', port=port, debug=False)