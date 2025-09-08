#!/usr/bin/env python3
import http.server
import socketserver
import os
from urllib.parse import urlparse

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add cache control headers to prevent caching
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def do_GET(self):
        # Parse the URL
        parsed_path = urlparse(self.path)
        file_path = parsed_path.path.lstrip('/')
        
        # If no file specified, serve index.html
        if file_path == '' or file_path == '/':
            file_path = 'index.html'
        
        # Check if the file exists
        if os.path.isfile(file_path):
            # File exists, serve it normally
            super().do_GET()
        else:
            # File doesn't exist, serve 404.html
            if os.path.isfile('404.html'):
                self.send_response(404)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                with open('404.html', 'rb') as f:
                    self.wfile.write(f.read())
            else:
                # Fallback to default 404
                super().do_GET()

PORT = 5000
Handler = CustomHTTPRequestHandler

with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print(f"Serving at http://0.0.0.0:{PORT}")
    httpd.serve_forever()