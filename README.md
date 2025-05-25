# Plataforma de Eventos - Projeto Individual

Este repositório contém o projeto de uma **plataforma de eventos com gerenciamento de inscrições**, desenvolvido durante o Módulo 2 do 1° ano de Inteli. 

O sistema permite cadastrar eventos e realizar inscrições de forma simples e eficiente.

---

## 📁 Estrutura de Pastas (MVC)
```
projeto-eventos/
│
├── config/ # Configuração do banco de dados
│ └── db.js
├── controllers/ # Lógica de controle de dados
│ └── eventController.js
├── models/ # Modelos do banco 
│ └── eventModels.js
├── routes/ # Rotas da aplicação
│ └── eventRoute.js
├── .env.example # Variáveis de ambiente de exemplo
├── .gitignore # Arquivos a serem ignorados no Github
├── package.json ## Conjunto de dependências do projeto
├── server.js # Ponto de entrada da aplicação
└── README.md # Instrução e explicação do projeto
```

---

## Como Executar o projeto localmente

### 1. Utilize uma IDE (ex:Visual Studio Code)

### 2. Clone o repositório

```bash
git clone https://github.com/leeunam/Projeto_Individual_Modulo02
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