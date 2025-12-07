#!/bin/bash
set -euo pipefail

PROXY_HOST="${1:-}"
SSH_KEY_FILE="${2:-}"
REMOTE_APP_DIR="${3:-}"
FRONTEND1_HOST="${4:-}"
FRONTEND2_HOST="${5:-}"
HEALTHCHECK_URL="${6:-}"
SSH_USER="ubuntu"

if [[ -z "$PROXY_HOST" || -z "$SSH_KEY_FILE" || -z "$REMOTE_APP_DIR" ]]; then
  echo "Uso: $0 <PROXY_HOST> <SSH_KEY_FILE> <REMOTE_APP_DIR> <FRONTEND1_HOST> <FRONTEND2_HOST> <HEALTHCHECK_URL(opcional)>"
  exit 1
fi

deploy_host() {
  local host="$1"
  [[ -z "$host" ]] && return 0

  echo "🚀 Iniciando deploy no frontend $host via Proxy $PROXY_HOST..."

  ssh -i "$SSH_KEY_FILE" -o StrictHostKeyChecking=no -J "$SSH_USER@$PROXY_HOST" "$SSH_USER@$host" bash -s <<EOF
set -euo pipefail

echo "📁 Entrando no diretório da aplicação: $REMOTE_APP_DIR"
cd "$REMOTE_APP_DIR"

echo "🛑 Derrubando stack atual (docker compose down)..."
docker compose down || echo "Aviso: docker compose down retornou erro (pode não haver stack ativa)."

echo "🧹 Limpando imagens antigas (docker image prune -f)..."
docker image prune -f

echo "⬇️  Pull da nova imagem (docker compose pull)..."
docker compose pull

echo "🚀 Subindo stack atualizada (docker compose up -d --force-recreate)..."
docker compose up -d --force-recreate

echo "📦 Containers em execução:"
docker compose ps

if [[ -n "$HEALTHCHECK_URL" ]]; then
  echo "🔍 Health-check em $HEALTHCHECK_URL..."
  if curl -fsS "$HEALTHCHECK_URL" >/dev/null; then
    echo "✅ Health-check OK"
  else
    echo "❌ Health-check falhou em $HEALTHCHECK_URL"
    echo "🔎 Últimos logs da aplicação:"
    docker compose logs -n 50
    exit 1
  fi
else
  echo "ℹ️ Nenhuma HEALTHCHECK_URL definida. Exibindo últimos logs para conferência:"
  docker compose logs -n 50 || true
fi
EOF

  echo "✅ Deploy concluído com sucesso em $host"
}

deploy_host "$FRONTEND1_HOST"
deploy_host "$FRONTEND2_HOST"


