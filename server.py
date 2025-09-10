#!/usr/bin/env python3
from flask import Flask, redirect, session, url_for, request, send_from_directory, render_template_string, jsonify
import google_auth_oauthlib.flow
import json
import os
import requests
from urllib.parse import urlparse

app = Flask(__name__, static_folder='.', static_url_path='')
app.secret_key = os.environ.get('FLASK_SECRET_KEY',
                                'dev-secret-change-in-production')


# OAuth configuration - we'll set this up with secrets
def get_oauth_config():
    try:
        oauth_config = json.loads(
            os.environ.get('GOOGLE_OAUTH_SECRETS',
                           '{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}'))
        if not oauth_config:
            return None
        return oauth_config
    except:
        return None


def create_oauth_flow():
    oauth_config = get_oauth_config()
    if not oauth_config:
        return None

    flow = google_auth_oauthlib.flow.Flow.from_client_config(
        oauth_config,
        scopes=[
            "https://www.googleapis.com/auth/userinfo.email",
            "openid",
            "https://www.googleapis.com/auth/userinfo.profile",
        ])
    return flow


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
    if "access_token" in session:
        user_info = get_user_info(session["access_token"])
        if user_info:
            return jsonify({
                'authenticated': True,
                'user': {
                    'name':
                    user_info.get('given_name', user_info.get('name', 'User')),
                    'email':
                    user_info.get('email', ''),
                    'picture':
                    user_info.get('picture', '')
                }
            })
    return jsonify({'authenticated': False})


# Authentication routes
@app.route('/signin')
def signin():
    oauth_flow = create_oauth_flow()
    if not oauth_flow:
        return 'OAuth not configured. Please set up GOOGLE_OAUTH_SECRETS.', 500

    oauth_flow.redirect_uri = url_for('oauth2callback',
                                      _external=True).replace(
                                          'http://', 'https://')
    authorization_url, state = oauth_flow.authorization_url()
    session['state'] = state
    return redirect(authorization_url)


@app.route('/oauth2callback')
def oauth2callback():
    if not session.get('state') == request.args.get('state'):
        return 'Invalid state parameter', 400

    oauth_flow = create_oauth_flow()
    if not oauth_flow:
        return 'OAuth not configured', 500

    oauth_flow.redirect_uri = url_for('oauth2callback',
                                      _external=True).replace(
                                          'http://', 'https://')
    oauth_flow.fetch_token(
        authorization_response=request.url.replace('http:', 'https:'))
    session['access_token'] = oauth_flow.credentials.token
    return redirect("/")


def get_user_info(access_token):
    try:
        response = requests.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            headers={"Authorization": f"Bearer {access_token}"})
        if response.status_code == 200:
            return response.json()
    except:
        pass
    return None


@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')


# Serve static files with proper routing
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')


@app.route('/<path:filename>')
def serve_static(filename):
    # Handle faction pages
    if filename.startswith('factions/') and filename.endswith('.html'):
        try:
            return send_from_directory('.', filename)
        except:
            return send_from_directory('.', '404.html'), 404

    # Handle other files
    try:
        return send_from_directory('.', filename)
    except:
        # File doesn't exist, serve 404
        try:
            return send_from_directory('.', '404.html'), 404
        except:
            return 'File not found', 404


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Serving at http://0.0.0.0:{port}")
    if get_oauth_config():
        print("✓ OAuth configured and ready")
    else:
        print(
            "⚠ OAuth not configured - authentication will not work until GOOGLE_OAUTH_SECRETS is set"
        )
    app.run(host='0.0.0.0', port=port, debug=False)
