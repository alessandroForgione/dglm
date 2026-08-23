#!/usr/bin/env bash
# Aggiorna l'immagine del Deployment e attende il rollout.
# Uso: scripts/deploy.sh <tag>   (es. sha-1a2b3c4, 20260823-1530, latest)
set -euo pipefail
export KUBECONFIG="${KUBECONFIG:-$HOME/.kube/finow-hetzner.yaml}"
K="kubectl --context finow-hetzner -n dglm"
IMAGE="${IMAGE:-ghcr.io/alessandroforgione/dglm-web}"
TAG="${1:?uso: deploy.sh <tag>}"
$K set image deploy/dglm-web web="$IMAGE:$TAG"
$K rollout status deploy/dglm-web --timeout=180s
$K get pods -l app=dglm-web
