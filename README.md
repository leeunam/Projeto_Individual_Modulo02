# 📅 Plataforma de Eventos - Projeto Individual

Este repositório contém o projeto de uma **plataforma de eventos com gerenciamento de inscrições**, desenvolvido como parte do Módulo 2 da formação. O sistema permite cadastrar eventos, listar participantes e realizar inscrições de forma simples e eficiente.

---

## 📁 Estrutura de Pastas (MVC)
```
projeto-eventos/
│
├── config/ # Configuração do banco de dados
│ └── database.js
├── controllers/ # Lógica de controle de dados
│ └── eventoController.js
├── models/ # Modelos do banco (query builders)
│ └── Evento.js
├── routes/ # Rotas da aplicação
│ └── index.js
├── views/ # Páginas renderizadas com EJS
│ └── pages/
│ ├── home.ejs
│ └── eventos.ejs
├── public/ # Arquivos estáticos (CSS, JS, imagens)
│ ├── css/
│ │ └── style.css
│ └── js/
│ └── script.js
├── .env.example # Variáveis de ambiente de exemplo
├── .gitignore
├── package.json
├── server.js # Ponto de entrada da aplicação
└── README.md
```

---

## 💻 Como Executar o projeto localmente

### 1. Utilize uma IDE (ex:Visual Studio Code)

### 2. Clone o repositório

```bash
git clone https://github.com/leeunam/Projeto_Individual_Modulo02
cd projeto-eventos
```

### 3. Abra o terminal (ctrl + j) e instale as dependências com o código abaixo:
```bash
npm init -y
npm install 
npm install express
```

### 4. Ainda no terminal (ctrl + j), inicie o servidor com o código abaixo:
```bash
npm start ou node server.js
```

🧑‍💻 Autor

Desenvolvido por Leunam Sousa de Jesus

[LinkedIn](https://www.linkedin.com/in/leunam/)
