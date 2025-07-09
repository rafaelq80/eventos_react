# Eventos React Playground

<br />

<div align="center">     
     <img src="https://i.imgur.com/AzshGmS.png" title="source: imgur.com" width="50%"/>
</div> 

<br />

<div align="center">   
    <img src="https://img.shields.io/github/languages/top/rafaelq80/eventos_react?style=flat-square" />
    <img src="https://img.shields.io/github/repo-size/rafaelq80/eventos_react?style=flat-square" />   
     <img src="https://img.shields.io/github/languages/count/rafaelq80/eventos_react?style=flat-square" />
    <img src="https://img.shields.io/github/last-commit/rafaelq80/eventos_react?style=flat-square" />
    <img src="https://img.shields.io/github/issues/rafaelq80/eventos_react?style=flat-square" />
  <img src="https://img.shields.io/github/issues-pr/rafaelq80/eventos_react?style=flat-square" />
    <img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=flat-square" /> 
</div>

<br />

Um playground interativo para testar, visualizar e aprender sobre eventos de **mouse** e **teclado** em aplicações React, com foco em acessibilidade e boas práticas modernas.

<br />

## ✨ Funcionalidades
- Área interativa para capturar e exibir eventos do mouse (cliques, arrasto, rolagem, etc.)
- Área de input para testar eventos de teclado (keydown, keyup, keypress, atalhos, etc.)
- Logs detalhados e contador de eventos em tempo real
- Efeitos visuais para interações do mouse
- Suporte a tema escuro/claro (dark mode)
- Componentes acessíveis com React Aria
- Código comentado e didático para estudo

<br />

## 🚀 Instalação

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd eventos
   ```
2. **Instale as dependências:**
   ```bash
   yarn install
   # ou
   npm install
   ```
3. **Rode o projeto localmente:**
   ```bash
   yarn dev
   # ou
   npm run dev
   ```
4. **Acesse no navegador:**
   - Normalmente em [http://localhost:5173](http://localhost:5173)

<br />

## 🗂️ Estrutura de Diretórios

```
├── src/
│   ├── components/         # Componentes reutilizáveis (ex: MouseArea)
│   ├── hooks/              # Hooks customizados (useMouseEvents, useKeyboardEvents, useDarkMode)
│   ├── pages/              # Páginas principais (EventTestingApp, MouseEventTester, KeyboardEventTester)
│   ├── types/              # Tipos TypeScript compartilhados
│   ├── assets/             # Imagens e SVGs
│   ├── App.tsx             # Componente raiz
│   └── main.tsx            # Ponto de entrada
├── public/                 # Arquivos estáticos
├── package.json            # Dependências e scripts
├── vite.config.ts          # Configuração do Vite
└── README.md               # Este arquivo
```

<br />

## 🛠️ Tecnologias Utilizadas

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (build rápido)
- [Tailwind CSS](https://tailwindcss.com/) (estilização)
- [React Aria](https://react-spectrum.adobe.com/react-aria/) (acessibilidade)

<br />

## ♿ Acessibilidade

- Áreas interativas usam componentes acessíveis (React Aria)
- Suporte a navegação por teclado e leitores de tela
- Dark mode para conforto visual

<br />

## 📚 Aprenda com o Código

O projeto é totalmente comentado (em português Brasil) com JSDoc e explicações nos hooks, componentes e páginas. Ideal para quem quer aprender sobre eventos, hooks customizados e acessibilidade em React.


