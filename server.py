import http.server
import socketserver
import json
import os
import urllib.request
import urllib.error
import sys

PORT = 8003

# Force working directory to the script's location
os.chdir(os.path.dirname(os.path.abspath(__file__)))

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
                model_id = data.get('model', 'gemini-2.0-flash-exp') # Default to new fast model
                
                # Get API key from request (cloud mode) or .env (local mode)
                api_key = data.get('apiKey') or os.environ.get('GEMINI_API') or os.environ.get('GEMINI_API_KEY')
                
                # Support for Multimodal (Images)
                image_data = data.get('image') # Base64 string
                image_mime = data.get('imageMime', 'image/jpeg')
                
                parts = [{"text": prompt}]
                if image_data:
                    parts.append({
                        "inline_data": {
                            "mime_type": image_mime,
                            "data": image_data
                        }
                    })

                # Construct URL with selected model
                if model_id == 'local-ollama':
                    url = "http://127.0.0.1:11434/api/generate"
                    # User has llama3.1:latest installed based on logs
                    payload = {
                        "model": "llama3.1:latest", 
                        "prompt": prompt,
                        "stream": False
                    }
                    try:
                        req = urllib.request.Request(
                            url,
                            data=json.dumps(payload).encode('utf-8'),
                            headers={'Content-Type': 'application/json'}
                        )
                        with urllib.request.urlopen(req) as response:
                            res = json.loads(response.read())
                            gemini_like = {
                                "candidates": [{
                                    "content": {"parts": [{"text": res.get("response", "")}]}
                                }]
                            }
                            self.send_response(200)
                            self.send_header('Content-type', 'application/json')
                            self.end_headers()
                            self.wfile.write(json.dumps(gemini_like).encode())
                    except urllib.error.URLError as e:
                        self.send_response(503)
                        self.send_header('Content-type', 'application/json')
                        self.end_headers()
                        self.wfile.write(json.dumps({'error': f'Ollama Connection Error: {str(e.reason)}. Ensure Ollama is running on 127.0.0.1:11434'}).encode())
                    except urllib.error.HTTPError as e:
                        self.send_response(e.code)
                        self.send_header('Content-type', 'application/json')
                        self.end_headers()
                        msg = "Local model 'llama3.1:latest' not found. Please run 'ollama pull llama3.1' or update server.py." if e.code == 404 else f"Ollama HTTP Error: {e.reason}"
                        self.wfile.write(json.dumps({'error': msg}).encode())
                    return

                if not api_key or 'YOUR_API_KEY' in api_key:
                    self.send_response(500)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': 'API Key not configured. Please set up your API key.'}).encode())
                    return

                url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_id}:generateContent?key={api_key}"
                
                gemini_payload = {
                    "contents": [{
                        "parts": parts
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
                print(f"API Error Details: {error_body}") 
                self.wfile.write(json.dumps({'error': f'API Error: {e.reason}', 'details': error_body}).encode())
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
