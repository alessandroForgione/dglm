#!/usr/bin/env bash
# Crea/aggiorna i Secret nel namespace dglm a partire da web/.env.production (gitignored).
# Uso: scripts/k8s-secrets.sh            → secret env
#      scripts/k8s-secrets.sh --ghcr     → anche imagePullSecret (chiede user e PAT read:packages)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
export KUBECONFIG="${KUBECONFIG:-$HOME/.kube/finow-hetzner.yaml}"
K="kubectl --context finow-hetzner -n dglm"
ENV_FILE="$ROOT/web/.env.production"

[ -f "$ENV_FILE" ] || { echo "Manca $ENV_FILE (copia web/.env.example e compila i valori di produzione)"; exit 1; }
grep -qE '^DATABASE_PATH=' "$ENV_FILE" && echo "nota: DATABASE_PATH in .env.production viene ignorato (il Deployment forza /data/dglm.db)"

$K create secret generic dglm-web-env --from-env-file="$ENV_FILE" --dry-run=client -o yaml | $K apply -f -
echo "✓ secret dglm-web-env aggiornato"

if [ "${1:-}" = "--ghcr" ]; then
  read -rp "GitHub username: " GH_USER
  read -rsp "PAT (read:packages): " GH_PAT; echo
  $K create secret docker-registry ghcr --docker-server=ghcr.io --docker-username="$GH_USER" --docker-password="$GH_PAT" \
    --dry-run=client -o yaml | $K apply -f -
  echo "✓ imagePullSecret ghcr creato — decommenta imagePullSecrets in k8s/deployment.yaml"
fi
