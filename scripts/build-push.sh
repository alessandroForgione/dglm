#!/usr/bin/env bash
# Fallback locale alla GitHub Action: builda linux/amd64 e pusha su ghcr.io.
# Richiede: docker login ghcr.io (PAT write:packages dell'owner del repo).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IMAGE="${IMAGE:-ghcr.io/alessandroforgione/dglm-web}"
TAG="${1:-$(date +%Y%m%d-%H%M)}"
docker build --platform linux/amd64 -t "$IMAGE:$TAG" -t "$IMAGE:latest" "$ROOT/web"
docker push "$IMAGE:$TAG"
docker push "$IMAGE:latest"
echo "✓ pushed $IMAGE:$TAG  → deploy con: scripts/deploy.sh $TAG"
