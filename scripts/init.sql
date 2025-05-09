CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE instituicoes (
  id SERIAL PRIMARY KEY,
  cnpj CHAR(18) UNIQUE,
  nome VARCHAR(255)
);

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  cpf CHAR(11) UNIQUE,
  nome VARCHAR(50),
  email VARCHAR(254) UNIQUE,
  telefone BIGINT,
  instituicao_id INT REFERENCES instituicoes(id),
  cargo VARCHAR(100)
);

CREATE TABLE interesse (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100)
);

CREATE TABLE tipo_user (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50)
);

CREATE TABLE interesse_user (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuarios(id),
  interesse_id INT REFERENCES interesse(id),
  UNIQUE(usuario_id, interesse_id)
);

CREATE TABLE anexos (
  id SERIAL PRIMARY KEY,
  caminho_arquivo VARCHAR(255),
  legenda VARCHAR(100)
);

CREATE TABLE eventos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  empresa_id INT REFERENCES instituicoes(id),
  usuario_id INT, -- Reflete o organizador, que está na tabela usuarios_eventos
  endereco VARCHAR(200),
  data_inicio DATE,
  data_fim DATE,
  anexo_id INT REFERENCES anexos(id)
);

CREATE TABLE usuarios_eventos (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuarios(id),
  evento_id INT REFERENCES eventos(id),
  tipo_user_id INT REFERENCES tipo_user(id),
  UNIQUE(usuario_id, evento_id)
);

CREATE TABLE atividades (
  id SERIAL PRIMARY KEY,
  evento_id INT REFERENCES eventos(id),
  nome VARCHAR(100),
  descricao TEXT,
  horario_inicio TIMESTAMP,
  horario_fim TIMESTAMP,
  palestrantes VARCHAR(2000)
);

CREATE TABLE inscricoes (
  id SERIAL PRIMARY KEY,
  atividade_id INT REFERENCES atividades(id),
  usuarios_id INT REFERENCES usuarios(id),
  check_in BOOLEAN,
  pontuacao INT,
  UNIQUE(usuarios_id, atividade_id)
);