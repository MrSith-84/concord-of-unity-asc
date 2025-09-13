#!/usr/bin/env python3
"""
Deployment wrapper for Concord of Unity site.
This file imports the Flask app from the concord_site directory
to satisfy the deployment configuration requirement for main:app.
"""

# Import the Flask app from the concord_site directory
from concord_site.main import app

if __name__ == '__main__':
    # If run directly, start the app
    app.run(host='0.0.0.0', port=5000, debug=False)