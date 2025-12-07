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

  ssh -i "$SSH_KEY_FILE" -o StrictHostKeyChecking=no "$SSH_USER@$PROXY_HOST" bash -s <<EOF
set -euo pipefail

ssh -i /home/ubuntu/caringu-infra/iac/caringu.pem -o StrictHostKeyChecking=no $SSH_USER@$host "cd '$REMOTE_APP_DIR' && bash -s" <<'INNER'
set -euo pipefail

echo "📁 Entrando no diretório da aplicação: $REMOTE_APP_DIR"
cd "$REMOTE_APP_DIR"

echo "🛑 Derrubando stack atual (docker compose down)..."
sudo docker compose -f docker-compose-hub.yml down || echo "Aviso: docker compose down retornou erro (pode não haver stack ativa)."

echo "🧹 Limpando imagens antigas (docker image prune -f)..."
sudo docker image prune -f

echo "⬇️  Pull da nova imagem (docker compose pull)..."
sudo docker compose -f docker-compose-hub.yml pull

echo "🚀 Subindo stack atualizada (docker compose up -d --force-recreate)..."
sudo docker compose -f docker-compose-hub.yml up -d --force-recreate

echo "📦 Containers em execução:"
sudo docker compose -f docker-compose-hub.yml ps

if [[ -n "$HEALTHCHECK_URL" ]]; then
  echo "🔍 Health-check em $HEALTHCHECK_URL..."
  if curl -fsS "$HEALTHCHECK_URL" >/dev/null; then
    echo "✅ Health-check OK"
  else
    echo "❌ Health-check falhou em $HEALTHCHECK_URL"
    echo "🔎 Últimos logs da aplicação:"
    sudo docker compose -f docker-compose-hub.yml logs -n 50
    exit 1
  fi
else
  echo "ℹ️ Nenhuma HEALTHCHECK_URL definida. Exibindo últimos logs para conferência:"
  sudo docker compose -f docker-compose-hub.yml logs -n 50 || true
fi
INNER
EOF

  echo "✅ Deploy concluído com sucesso em $host"
}

deploy_host "$FRONTEND1_HOST"
deploy_host "$FRONTEND2_HOST"


