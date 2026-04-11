# TODO: Multi-stage Dockerfile for FastAPI
# Stage 1: builder
#   - Use python:3.11-slim
#   - Install dependencies from requirements.txt
#
# Stage 2: runner
#   - Use python:3.11-slim
#   - Copy only necessary files from builder
#   - Create non-root user for security
#   - Expose port 8000
#   - Add HEALTHCHECK
#   - CMD: uvicorn app:app --host 0.0.0.0 --port 8000

FROM python:3.11-slim AS builder

WORKDIR /build

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


FROM python:3.11-slim

WORKDIR /app

COPY --from=builder /opt/venv /opt/venv

ENV PATH="/opt/venv/bin:$PATH"
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN useradd -m app && chown -R app:app /app
USER app

COPY . .

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD python -c "import requests; requests.get('http://localhost:8000/health')"

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]