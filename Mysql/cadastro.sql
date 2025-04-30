-- Criação do banco de dados
CREATE DATABASE urbane_clothing;

USE urbane_clothing;

-- Tabela de Usuários
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY,
    nome_completo VARCHAR(100) NOT NULL,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Tabela de Endereços (opcional, mas recomendado para e-commerce)
CREATE TABLE enderecos (
    id_endereco INT PRIMARY KEY,
    id_usuario INT NOT NULL,
    cep VARCHAR(10) NOT NULL,
    logradouro VARCHAR(100) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(50),
    bairro VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado CHAR(2) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Tabela de Preferências (opcional)
CREATE TABLE preferencias (
    id_preferencia INT PRIMARY KEY,
    id_usuario INT NOT NULL,
    tema_preferido VARCHAR(20) DEFAULT 'escuro',
    receber_promocoes BOOLEAN DEFAULT true,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);