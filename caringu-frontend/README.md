# Projeto React - Estrutura de Pastas

Este documento explica a estrutura de pastas utilizada no projeto, facilitando a organização e manutenção do código.

## Estrutura de Diretórios

```
├───📁caringu-frontend
│       .gitignore
│       eslint.config.js
│       index.html
│       package-lock.json
│       package.json
│       README.md
│       vite.config.js
│
├───📁public
│       favicon.png
│
└───📁src
    │   main.jsx
    │   routes.jsx
    │
    ├───📁assets
    │   ├───📁gifs
    │   │       loading.gif
    │   │
    │   ├───📁images
    │   │       dumbbell-fitness.svg
    │   │       imagem-cadastro.svg
    │   │       imagem-login.svg
    │   │       mochila-treino.svg
    │   │       seta-voltar.svg
    │   │
    │   └───📁logos
    │           caringu-logo-light.svg
    │           caringu-logotipo-light.svg
    │           google-logo.svg
    │
    ├───📁components
    │   ├───📁Cadastro
    │   │
    │   ├───📁Login
    │   │        📄login.css
    │   │        📄Login.jsx
    │   │
    │   └───📁Outras Pastas...
    │
    ├───📁layout
    │
    ├───📁pages
    │       📄login.jsx
    │
    ├───📁service
    │
    └───📁styles
            📄global.css
            📄keyframe.css
```

## Descrição da Estrutura de Pastas

### **Root (`/` - Diretório Principal)**
- **`.gitignore`**: Arquivo que define quais arquivos e pastas devem ser ignorados pelo Git.
- **`eslint.config.js`**: Configuração do ESLint para padronização de código.
- **`index.html`**: Arquivo HTML principal do projeto.
- **`package.json` / `package-lock.json`**: Gerenciamento de dependências do projeto.
- **`README.md`**: Documentação do projeto.
- **`vite.config.js`**: Configuração do Vite para a construção do projeto.

### **Public (`/public` - Arquivos Públicos)**
- Contém arquivos estáticos que não são processados pelo Vite, como imagens e ícones.
- **`favicon.png`**: Ícone da aplicação.

### **Source (`/src` - Código-Fonte do Projeto)**

#### **Arquivos Principais**
- **`main.jsx`**: Ponto de entrada do React, onde o componente principal da aplicação é renderizado.
- **`routes.jsx`**: Definição das rotas da aplicação utilizando React Router.

#### **Pasta `assets/` - Recursos do Projeto**
- **`gifs/`**: Contém animações em formato GIF, como o `loading.gif`.
- **`images/`**: Contém imagens diversas utilizadas na interface, como ícones e ilustrações, incluindo:
  - `dumbbell-fitness.svg`
  - `imagem-cadastro.svg`
  - `imagem-login.svg`
  - `mochila-treino.svg`
  - `seta-voltar.svg`
- **`logos/`**: Contém os logos da aplicação e parceiros, como:
  - `caringu-logo-light.svg`
  - `caringu-logotipo-light.svg`
  - `google-logo.svg`

#### **Pasta `components/` - Componentes Reutilizáveis**
- Contém os componentes reutilizáveis da aplicação.
    - **Cadastro**: Arquivos relacionados ao processo de cadastro de usuários.
    - **Login**: Contém o componente de login (`Login.jsx`) e seu estilo (`login.css`).

#### **Pasta `layout/` - Estrutura da Aplicação**
- Pode conter componentes relacionados à estrutura geral da aplicação, como cabeçalhos, rodapés, ou barras laterais.
    - **`apagar.txt`**: Arquivo temporário, possivelmente a ser removido ou substituído.

#### **Pasta `pages/` - Páginas da Aplicação**
- Cada arquivo dentro desta pasta representa uma página específica da aplicação.
    - **`login.jsx`**: Página de login da aplicação.

#### **Pasta `service/` - Serviços e API Calls**
- Armazena funções responsáveis por chamadas à API, autenticação e gerenciamento de dados externos.
    - **`apagar.txt`**: Arquivo temporário, possivelmente a ser removido ou substituído.

#### **Pasta `styles/` - Estilos Globais**
- Contém os arquivos CSS globais e específicos da aplicação.
    - **`global.css`**: Estilos globais aplicados em toda a aplicação.
    - **`keyframe.css`**: Estilos para animações ou transições.

---
Essa estrutura de pastas foi pensada para garantir organização, modularização e escalabilidade ao projeto. 🚀

