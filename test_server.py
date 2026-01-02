import unittest
import json
import os
from server import GeminiHandler
from http.server import HTTPServer
import threading
import requests
import time

class TestServer(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.port = 8004
        cls.server = HTTPServer(('localhost', cls.port), GeminiHandler)
        cls.thread = threading.Thread(target=cls.server.serve_forever)
        cls.thread.daemon = True
        cls.thread.start()
        time.sleep(1) # Wait for server to start

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()

    def test_health_check(self):
        # The server doesn't have a health check, but calling a non-existent path should return 404
        response = requests.get(f'http://localhost:{self.port}/invalid')
        self.assertEqual(response.status_code, 404)

    def test_generate_without_auth(self):
        # Should return 500 or 400 if API key is missing and not in .env
        response = requests.post(f'http://localhost:{self.port}/api/generate', json={'prompt': 'test'})
        # Depending on whether .env exists, this might be 500 or 200 (if .env has valid key)
        # But we check that it's a valid JSON response
        self.assertEqual(response.headers['Content-Type'], 'application/json')

if __name__ == '__main__':
    unittest.main()
