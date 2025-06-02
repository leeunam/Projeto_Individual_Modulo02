# Documentação de Endpoints - Sistema de Gerenciamento de Eventos

## Visão Geral

Esta documentação descreve todos os endpoints disponíveis na API REST do sistema de gerenciamento de eventos. A API está organizada em três módulos principais: **Usuários**, **Eventos** e **Endereços**.

**Base URL:** `http://localhost:3000`

---

## Autenticação

O sistema utiliza sessões para autenticação. Após o login bem-sucedido, as informações do usuário são armazenadas na sessão e utilizadas para autorização nas rotas protegidas.

---

## Endpoints de Usuários

### 1. **POST** `/api/users` - Criar Usuário

**Descrição:** Cria um novo usuário no sistema.

**Body (JSON):**

```json
{
  "name": "Nome do Usuário",
  "email": "usuario@email.com",
  "password": "senha123",
  "role": "organizador" // ou "participante"
}
```

**Resposta de Sucesso (201):**

```json
{
  "id": 1,
  "name": "Nome do Usuário",
  "email": "usuario@email.com",
  "role": "organizador"
}
```

**Possíveis Erros:**

- `400` - Dados inválidos ou email já existente
- `500` - Erro interno do servidor

---

### 2. **GET** `/api/users` - Listar Todos os Usuários

**Descrição:** Retorna uma lista de todos os usuários cadastrados.

**Resposta de Sucesso (200):**

```json
[
  {
    "id": 1,
    "name": "Nome do Usuário",
    "email": "usuario@email.com",
    "role": "organizador"
  }
]
```

---

### 3. **GET** `/api/users/:id` - Buscar Usuário por ID

**Descrição:** Retorna os dados de um usuário específico.

**Parâmetros:**

- `id` (path): ID do usuário

**Resposta de Sucesso (200):**

```json
{
  "id": 1,
  "name": "Nome do Usuário",
  "email": "usuario@email.com",
  "role": "organizador"
}
```

**Possíveis Erros:**

- `404` - Usuário não encontrado

---

### 4. **PUT** `/api/users/:id` - Atualizar Usuário

**Descrição:** Atualiza os dados de um usuário específico.

**Parâmetros:**

- `id` (path): ID do usuário

**Body (JSON):**

```json
{
  "name": "Novo Nome",
  "email": "novoemail@email.com"
}
```

**Resposta de Sucesso (200):**

```json
{
  "message": "Usuário atualizado com sucesso"
}
```

---

### 5. **DELETE** `/api/users/:id` - Deletar Usuário

**Descrição:** Remove um usuário do sistema.

**Parâmetros:**

- `id` (path): ID do usuário

**Resposta de Sucesso (200):**

```json
{
  "message": "Usuário deletado com sucesso"
}
```

---

## Endpoints de Eventos

### 1. **POST** `/api/events` - Criar Evento

**Descrição:** Cria um novo evento no sistema.

**Body (JSON):**

```json
{
  "name": "Nome do Evento",
  "user_id": 1,
  "address_id": 1,
  "event_time": "19:00:00",
  "event_date": "2025-12-25",
  "description": "Descrição do evento"
}
```

**Resposta de Sucesso (201):**

```json
{
  "id": 1,
  "name": "Nome do Evento",
  "user_id": 1,
  "address_id": 1,
  "event_time": "19:00:00",
  "event_date": "2025-12-25",
  "description": "Descrição do evento"
}
```

---

### 2. **GET** `/api/events` - Listar Todos os Eventos

**Descrição:** Retorna uma lista de todos os eventos cadastrados.

**Resposta de Sucesso (200):**

```json
[
  {
    "id": 1,
    "name": "Nome do Evento",
    "user_id": 1,
    "address_id": 1,
    "event_time": "19:00:00",
    "event_date": "2025-12-25",
    "description": "Descrição do evento"
  }
]
```

---

### 3. **GET** `/api/events/:id` - Buscar Evento por ID

**Descrição:** Retorna os dados de um evento específico.

**Parâmetros:**

- `id` (path): ID do evento

**Resposta de Sucesso (200):**

```json
{
  "id": 1,
  "name": "Nome do Evento",
  "user_id": 1,
  "address_id": 1,
  "event_time": "19:00:00",
  "event_date": "2025-12-25",
  "description": "Descrição do evento"
}
```

---

### 4. **PUT** `/api/events/:id` - Atualizar Evento

**Descrição:** Atualiza os dados de um evento específico.

**Parâmetros:**

- `id` (path): ID do evento

**Body (JSON):**

```json
{
  "name": "Novo Nome do Evento",
  "event_time": "20:00:00",
  "event_date": "2025-12-30",
  "description": "Nova descrição"
}
```

**Resposta de Sucesso (200):**

```json
{
  "message": "Evento atualizado com sucesso"
}
```

---

### 5. **DELETE** `/api/events/:id` - Deletar Evento

**Descrição:** Remove um evento do sistema.

**Parâmetros:**

- `id` (path): ID do evento

**Resposta de Sucesso (200):**

```json
{
  "message": "Evento deletado com sucesso"
}
```

---

## Endpoints de Endereços

### 1. **POST** `/api/address` - Criar Endereço

**Descrição:** Cria um novo endereço no sistema.

**Body (JSON):**

```json
{
  "street": "Rua das Flores",
  "number": 123,
  "district": "Centro",
  "cep": "01234-567"
}
```

**Resposta de Sucesso (201):**

```json
{
  "id": 1,
  "street": "Rua das Flores",
  "number": 123,
  "district": "Centro",
  "cep": "01234-567"
}
```

---

### 2. **GET** `/api/address` - Listar Todos os Endereços

**Descrição:** Retorna uma lista de todos os endereços cadastrados.

**Resposta de Sucesso (200):**

```json
[
  {
    "id": 1,
    "street": "Rua das Flores",
    "number": 123,
    "district": "Centro",
    "cep": "01234-567"
  }
]
```

---

### 3. **GET** `/api/address/:id` - Buscar Endereço por ID

**Descrição:** Retorna os dados de um endereço específico.

**Parâmetros:**

- `id` (path): ID do endereço

**Resposta de Sucesso (200):**

```json
{
  "id": 1,
  "street": "Rua das Flores",
  "number": 123,
  "district": "Centro",
  "cep": "01234-567"
}
```

---

### 4. **PUT** `/api/address/:id` - Atualizar Endereço

**Descrição:** Atualiza os dados de um endereço específico.

**Parâmetros:**

- `id` (path): ID do endereço

**Body (JSON):**

```json
{
  "street": "Nova Rua",
  "number": 456,
  "district": "Novo Bairro",
  "cep": "98765-432"
}
```

---

### 5. **DELETE** `/api/address/:id` - Deletar Endereço

**Descrição:** Remove um endereço do sistema.

**Parâmetros:**

- `id` (path): ID do endereço

**Resposta de Sucesso (200):**

```json
{
  "message": "Endereço deletado com sucesso"
}
```

---

## Endpoints de Interface Web

### Autenticação

- **GET** `/login` - Exibe página de login
- **POST** `/login` - Processa login do usuário
- **GET** `/register` - Exibe página de cadastro
- **POST** `/register` - Processa cadastro de novo usuário

### Páginas Principais

- **GET** `/` - Página inicial (home)
- **GET** `/eventos` - Lista todos os eventos disponíveis
- **GET** `/evento/:id` - Exibe detalhes de um evento específico

### Gerenciamento de Eventos

- **GET** `/criarEvento` - Exibe formulário de criação de evento
- **POST** `/criarEvento` - Processa criação de novo evento
- **GET** `/evento/:id/editar` - Exibe formulário de edição de evento
- **POST** `/evento/:id/editar` - Processa edição de evento
- **DELETE** `/evento/:id` - Deleta um evento
- **GET** `/gerenciar` - Exibe página de gerenciamento de eventos do usuário

### Inscrições em Eventos

- **POST** `/evento/:id/inscrever` - Realiza inscrição em um evento
- **GET** `/inscricao-confirmada/:id` - Exibe confirmação de inscrição

### Endereços

- **GET** `/adicionarEndereco` - Exibe formulário de cadastro de endereço

---

## Códigos de Status HTTP

| Código | Significado                                      |
| ------ | ------------------------------------------------ |
| 200    | OK - Requisição bem-sucedida                     |
| 201    | Created - Recurso criado com sucesso             |
| 400    | Bad Request - Dados inválidos na requisição      |
| 401    | Unauthorized - Não autorizado                    |
| 404    | Not Found - Recurso não encontrado               |
| 500    | Internal Server Error - Erro interno do servidor |

---

## Exemplos de Uso

### Exemplo: Criar um novo evento

```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Workshop de Programação",
    "user_id": 1,
    "address_id": 1,
    "event_time": "14:00:00",
    "event_date": "2025-07-15",
    "description": "Workshop sobre desenvolvimento web"
  }'
```

### Exemplo: Listar todos os eventos

```bash
curl -X GET http://localhost:3000/api/events
```

### Exemplo: Buscar evento por ID

```bash
curl -X GET http://localhost:3000/api/events/1
```

---

## Notas Técnicas

- Todos os endpoints da API estão sob o prefixo `/api`
- Os endpoints de interface web não possuem prefixo e renderizam páginas HTML
- O sistema utiliza PostgreSQL como banco de dados
- A autenticação é baseada em sessões do Express
- Todas as datas devem estar no formato `YYYY-MM-DD`
- Todos os horários devem estar no formato `HH:MM:SS`
