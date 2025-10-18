# Etapa 1: Build do app
FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Nginx vai servir os arquivos estáticos
FROM nginx:stable-alpine

# Copia os arquivos estáticos gerados no estágio anterior para a pasta padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# A porta que o Nginx vai escutar DENTRO do container
EXPOSE 80

# O comando padrão do Nginx já inicia o servidor, então não precisamos de um CMD