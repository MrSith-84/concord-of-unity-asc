#!/usr/bin/env python3
"""
Deployment wrapper for Concord of Unity site.
This file imports the Flask app from the concord_site directory
to satisfy the deployment configuration requirement for main:app.
"""

# Import the Flask app from the concord_site directory
from concord_site.main import app
from flask import jsonify
import os

# Add a simple health check for deployment health checks
@app.route('/health')
def deployment_health():
    return jsonify({'status': 'healthy', 'deployment': 'autoscale'}), 200

if __name__ == '__main__':
    # If run directly, start the app
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=False)