#!/usr/bin/env bash
# Fallback locale alla GitHub Action: builda linux/amd64, pusha su ghcr.io e aggiorna il tag in k8s/deployment.yaml.
# Poi: git commit + push → ArgoCD fa il rollout.
# Richiede: docker login ghcr.io (PAT write:packages dell'owner del repo).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IMAGE="${IMAGE:-ghcr.io/alessandroforgione/dglm-web}"
TAG="${1:-local-$(git -C "$ROOT" rev-parse --short=7 HEAD)-$(date +%H%M)}"
docker build --platform linux/amd64 -t "$IMAGE:$TAG" -t "$IMAGE:latest" "$ROOT/web"
docker push "$IMAGE:$TAG"
docker push "$IMAGE:latest"
sed -i '' -E "s#image: ghcr\.io/[^ ]+/dglm-web:[^ ]+#image: ${IMAGE}:${TAG}#" "$ROOT/k8s/deployment.yaml"
echo "✓ pushed $IMAGE:$TAG e aggiornato k8s/deployment.yaml → ora: git commit -am 'deploy: $TAG' && git push"
