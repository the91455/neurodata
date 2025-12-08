import http.server
import socketserver
import json
import os
import urllib.request
import urllib.error
import sys

PORT = 8003

def load_env():
    """Simple .env loader for standard library usage"""
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    if os.path.exists(env_path):
        with open(env_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    key = key.strip()
                    value = value.strip()
                    # Strip quotes if present
                    if (value.startswith('"') and value.endswith('"')) or \
                       (value.startswith("'") and value.endswith("'")):
                        value = value[1:-1]
                    os.environ[key] = value




class GeminiHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        load_env() # Reload env vars on every request
        if self.path == '/api/generate':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data)
                prompt = data.get('prompt', '')
                
                api_key = os.environ.get('GEMINI_API')
                if not api_key or 'YOUR_API_KEY' in api_key:
                    self.send_response(500)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': 'API Key not configured in .env'}).encode())
                    return

                # Use gemini-2.5-flash which is currently available
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
                
                gemini_payload = {
                    "contents": [{
                        "parts": [{"text": prompt}]
                    }]
                }
                
                req = urllib.request.Request(
                    url,
                    data=json.dumps(gemini_payload).encode('utf-8'),
                    headers={'Content-Type': 'application/json'}
                )
                
                with urllib.request.urlopen(req) as response:
                    response_body = response.read()
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(response_body)
                    
            except urllib.error.HTTPError as e:
                error_body = e.read().decode('utf-8')
                self.send_response(e.code)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                print(f"API Error Details: {error_body}") # Print to terminal for debugging
                self.wfile.write(json.dumps({'error': f'Gemini API Error: {e.reason}', 'details': error_body}).encode())
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode())
        else:
            self.send_error(404)

print(f"Server starting on http://localhost:{PORT}")
with socketserver.TCPServer(("", PORT), GeminiHandler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
