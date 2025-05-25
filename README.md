# Plataforma de Eventos - Projeto Individual

Este repositório contém o projeto de uma **plataforma de eventos com gerenciamento de inscrições**, desenvolvido durante o Módulo 2 do 1° ano de Inteli. 

O sistema permite cadastrar eventos e realizar inscrições de forma simples e eficiente.

---

## 📁 Estrutura de Pastas
```
projeto-eventos/
│
├── assets/           # Arquivos estáticos (imagens, diagramas)
├── config/           # Configurações do projeto
│   └── db.js        # Configuração do banco de dados
├── controllers/      # Controladores da aplicação
│   ├── userController.js
│   ├── eventController.js
│   └── addressController.js
├── models/          # Modelos do banco de dados
│   ├── User.js
│   ├── Event.js
│   └── Address.js
├── routes/          # Rotas da aplicação
│   ├── userRoutes.js
│   ├── eventRoutes.js
│   └── addressRoutes.js
├── views/           # Templates e arquivos frontend
├── migrations/      # Arquivos de migração do banco
├── documentos/      # Documentação do projeto
├── scripts/         # Scripts úteis
├── node_modules/    # Dependências do projeto
├── .env.example     # Exemplo de variáveis de ambiente
├── .gitignore      # Arquivos ignorados no git
├── knexfile.js     # Configuração do Knex (migração funcional da aplicação)
├── package.json    # Dependências e scripts
├── server.js       # Ponto de entrada da aplicação
└── README.md       # Este arquivo
```

## Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 14 ou superior)
- PostgreSQL (versão 12 ou superior)
- NPM ou Yarn

### 1. Clone o repositório
```bash
git clone https://github.com/leeunam/Projeto_Individual_Modulo02
cd Projeto_Individual_Modulo02
```

### 2. Configure as variáveis de ambiente
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

### 3. Instale as dependências
```bash
npm install
```

### 4. Execute as migrações do banco de dados
```bash
npm run migrate
```

### 5. Inicie o servidor
```bash
npm run dev  # Para ambiente de desenvolvimento
# ou
npm start    # Para ambiente de produção
```

O servidor estará rodando em `http://localhost:3000`

## 🧑‍💻 Autor

Desenvolvido por Leunam Sousa de Jesus

[LinkedIn](https://www.linkedin.com/in/leunam/)

## 📝 Licença

Simples by Inteli, Leunam Sousa de Jesus is licensed under Creative Commons Attribution 4.0 International