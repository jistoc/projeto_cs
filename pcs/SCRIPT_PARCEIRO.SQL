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



