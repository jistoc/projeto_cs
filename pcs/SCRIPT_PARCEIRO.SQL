CREATE TABLE usuario (
    id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
	senha VARCHAR(255) NOT NULL,
	status INT DEFAULT 1
);

CREATE TABLE parceiro (
    id_parceiro INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	cnpj VARCHAR(18) NOT NULL UNIQUE,
	nome_fantasia VARCHAR(255) NOT NULL,
	razao_social VARCHAR(255) NOT NULL,
	nome_usuario VARCHAR(255) NOT NULL,
	id_usuario int NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);


CREATE TABLE token_black (
	token TEXT(1024) NOT NULL,
	KEY ix_length_token (token(1024))
);

CREATE TABLE cliente (
	id_cliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nome_cliente VARCHAR(255) NOT NULL,
	cpf VARCHAR(14) NOT NULL,
	status int default 1
);

CREATE TABLE titulo (
	id_titulo int primary key AUTO_INCREMENT,
	id_parceiro int not null,
	id_cliente int not null,
	valor varchar(20) not null,
	descricao varchar(200),
	data_emissao varchar(10) not null,
	data_pagamento varchar(10),
	situacao int not null
);