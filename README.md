# caringu-frontend
Repositório destinado ao frontend da aplicação.

# Projeto com JSON Server

Esta aplicação utiliza o [JSON Server](https://www.npmjs.com/package/json-server), uma ferramenta para criar rapidamente uma API RESTful simulada a partir de um arquivo JSON. É ideal para prototipagem rápida ou para simular um backend durante o desenvolvimento.
##### Contando com os métodos de GET, POST, PUT, PATCH, DELETE...

## 1. Pré-requisitos

- [Node.js](https://nodejs.org) tem que estar instalado. Para verificar se tem instalado utilize o comando e verifique se a versão é 18 ou mais:

  ```bash
  node -v
  ```

## 2. Inicializar o projeto
- Crie o banco de dados no MySQL utilizando o comando:

    ```bash
    npx json-server db.json
    ```
    O servidor estará rodando em http://localhost:3000 contando com as respectivas URIs de acordo com as entidades que existirem no arquivo [db.json](db.json) ✅

## Observação
Caso não funcione tente digitar o seguinte comando no terminal:
```bash
npm install json-server
```

Em seguida tente novamente o item 2...