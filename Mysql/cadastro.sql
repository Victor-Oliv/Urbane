CREATE DATABASE IF NOT EXISTS urbane_clothing;

USE urbane_clothing;
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(100) NOT NULL,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

USE urbane_clothing;

-- Adicione esta coluna se ainda não existir
ALTER TABLE usuarios ADD COLUMN usuario VARCHAR(50) NOT NULL UNIQUE AFTER nome_completo;

-- Crie um usuário de exemplo para teste (opcional)
INSERT INTO usuarios 
(nome_completo, usuario, data_nascimento, email, senha) 
VALUES 
('Usuário Teste', 'teste123', '1990-01-01', 'teste@urbane.com', SHA2('senha123', 256));

