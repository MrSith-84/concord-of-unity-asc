# Use this Flask blueprint for Google authentication. Do not use flask-dance.
# Referenced from Replit's flask_google_oauth integration

import json
import os

import requests
from models import db, User
from flask import Blueprint, redirect, request, url_for
from flask_login import login_required, login_user, logout_user
from oauthlib.oauth2 import WebApplicationClient

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_OAUTH_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_OAUTH_CLIENT_SECRET")
REPLIT_DEV_DOMAIN = os.environ.get("REPLIT_DEV_DOMAIN", "localhost:5000")

# Check for required environment variables
AUTH_CONFIGURED = bool(GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET)
if not AUTH_CONFIGURED:
    print("⚠️ Warning: Google OAuth credentials not found in environment variables.")
    print("Please set GOOGLE_OAUTH_CLIENT_ID and GOOGLE_OAUTH_CLIENT_SECRET")

GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"

# Make sure to use this redirect URL. It has to match the one in the whitelist
DEV_REDIRECT_URL = f'https://{REPLIT_DEV_DOMAIN}/google_login/callback'

# ALWAYS display setup instructions to the user:
print(f"""To make Google authentication work:
1. Go to https://console.cloud.google.com/apis/credentials
2. Create a new OAuth 2.0 Client ID
3. Add {DEV_REDIRECT_URL} to Authorized redirect URIs

For detailed instructions, see:
https://docs.replit.com/additional-resources/google-auth-in-flask#set-up-your-oauth-app--client
""")

# Only create client if OAuth is properly configured
client = WebApplicationClient(GOOGLE_CLIENT_ID) if AUTH_CONFIGURED else None

google_auth = Blueprint("google_auth", __name__)


@google_auth.route("/google_login")
def login():
    if not AUTH_CONFIGURED:
        return """
        <h1>Authentication Not Configured</h1>
        <p>Google OAuth credentials are missing. Please configure:</p>
        <ul>
            <li>GOOGLE_OAUTH_CLIENT_ID</li>
            <li>GOOGLE_OAUTH_CLIENT_SECRET</li>
        </ul>
        <p><a href="/">Return to home</a></p>
        """, 503
    google_provider_cfg = requests.get(GOOGLE_DISCOVERY_URL).json()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        # Replacing http:// with https:// is important as the external
        # protocol must be https to match the URI whitelisted
        redirect_uri=request.base_url.replace("http://", "https://") + "/callback",
        scope=["openid", "email", "profile"],
    )
    return redirect(request_uri)


@google_auth.route("/google_login/callback")
def callback():
    if not AUTH_CONFIGURED:
        return "OAuth not configured", 503
    
    # Debug: Check what we received from Google
    code = request.args.get("code")
    error = request.args.get("error")
    
    if error:
        return f"OAuth error: {error}. Please try again. <a href='/'>Return home</a>", 400
    
    if not code:
        return "No authorization code received from Google. Please try again. <a href='/'>Return home</a>", 400
    
    try:
        google_provider_cfg = requests.get(GOOGLE_DISCOVERY_URL).json()
        token_endpoint = google_provider_cfg["token_endpoint"]
    except Exception as e:
        return f"Failed to get Google configuration: {str(e)}. <a href='/'>Return home</a>", 500

    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        # Replacing http:// with https:// is important as the external
        # protocol must be https to match the URI whitelisted
        authorization_response=request.url.replace("http://", "https://"),
        redirect_url=request.base_url.replace("http://", "https://"),
        code=code,
    )
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
    )

    client.parse_request_body_response(json.dumps(token_response.json()))

    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    userinfo = userinfo_response.json()
    if userinfo.get("email_verified"):
        users_email = userinfo["email"]
        users_name = userinfo["given_name"]
    else:
        return "User email not available or not verified by Google.", 400

    user = User.query.filter_by(email=users_email).first()
    if not user:
        user = User()
        user.username = users_name
        user.email = users_email
        db.session.add(user)
        db.session.commit()

    login_user(user)

    return redirect("/classified.html")


@google_auth.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect("/")