FROM python:3.11-slim

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir requests

EXPOSE 8003

CMD ["python", "server.py"]
