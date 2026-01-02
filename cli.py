import requests
import json
import argparse
import sys
import os

def main():
    parser = argparse.ArgumentParser(description="NeuroData CLI - Generate synthetic data from terminal")
    parser.add_argument("prompt", help="The prompt to generate data for")
    parser.add_argument("--model", default="gemini-2.0-flash-exp", help="Model ID")
    parser.add_argument("--output", "-o", help="Output file path")
    parser.add_argument("--url", default="http://localhost:8003", help="Server URL")
    parser.add_argument("--api-key", help="Gemini API Key (optional if server has it)")

    args = parser.parse_args()

    payload = {
        "prompt": args.prompt,
        "model": args.model
    }
    if args.api_key:
        payload["apiKey"] = args.api_key

    try:
        print(f"📡 Requesting data for: {args.prompt}...")
        response = requests.post(f"{args.url}/api/generate", json=payload)
        response.raise_for_status()
        
        data = response.json()
        text = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
        
        if not text:
            print("❌ Error: No content generated.")
            sys.exit(1)

        if args.output:
            with open(args.output, "w") as f:
                f.write(text)
            print(f"✅ Data saved to: {args.output}")
        else:
            print("\n" + "="*40)
            print("GENERATED DATA:")
            print("="*40)
            print(text)
            print("="*40)

    except Exception as e:
        print(f"❌ Connection Error: {e}")
        print("Ensure local server is running: python3 server.py")

if __name__ == "__main__":
    main()
