CREATE TABLE IF NOT EXISTS clientes (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	cpf VARCHAR(100) UNIQUE NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS vendedores (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	cpf VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS itens (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	preco DOUBLE(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS estoque (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_item INT UNIQUE NOT NULL,
	quantidade_atual INT NOT NULL,
	FOREIGN KEY(id_item) REFERENCES itens(id)
);

CREATE TABLE IF NOT EXISTS vendas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_cliente INT NOT NULL,
	id_vendedor INT NOT NULL,
	data_hora DATETIME NOT NULL,
	status VARCHAR(100) NOT NULL,
	total DOUBLE(10, 2) NOT NULL,
	FOREIGN KEY(id_cliente) REFERENCES clientes(id),
	FOREIGN KEY(id_vendedor) REFERENCES vendedores(id)
);

CREATE TABLE IF NOT EXISTS vendas_detalhes (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_venda INT NOT NULL,
	id_item INT NOT NULL,
	quantidade INT NOT NULL,
	preco INT NOT NULL,
	FOREIGN KEY(id_venda) REFERENCES vendas(id),
	FOREIGN KEY(id_item) REFERENCES itens(id)
);

INSERT INTO clientes (nome, cpf, email) 
VALUES ('Otávio Anderson Davi dos Santos', '71072741121', 'otavio_anderson_dossantos@directnet.com.br');

INSERT INTO clientes (nome, cpf, email) 
VALUES ('Helena Eloá Alessandra da Cunha', '33620033625', 'helenaeloadacunha@likaleal.com.br');

INSERT INTO clientes (nome, cpf, email) 
VALUES ('Bryan Diego Sérgio Aparício', '38795350942', 'bryan.diego.aparicio@galvao.com');

INSERT INTO clientes (nome, cpf, email) 
VALUES ('Liz Luzia Milena Farias', '09615376396', 'liz_luzia_farias@vitacard.com.br');

INSERT INTO clientes (nome, cpf, email) 
VALUES ('Antonio Arthur Roberto Moraes', '75315419126', 'antonio.arthur.moraes@athoscontabil.com.br');

INSERT INTO vendedores (nome, cpf) 
VALUES ('Andreia Heloise Rezende', '66521905910');

INSERT INTO vendedores (nome, cpf) 
VALUES ('Nair Rosângela Olivia Mendes', '01863784756');

INSERT INTO itens (nome, preco) 
VALUES ('Suplemento Nutricional', 49.35);

INSERT INTO estoque (id_item, quantidade_atual) 
VALUES (1, 31);

INSERT INTO itens (nome, preco) 
VALUES ('Creme Dental ', 20.00);

INSERT INTO estoque (id_item, quantidade_atual) 
VALUES (2, 48);

INSERT INTO itens (nome, preco) 
VALUES ('Vitaminas C e D', 42.28);

INSERT INTO estoque (id_item, quantidade_atual) 
VALUES (3, 8);

INSERT INTO itens (nome, preco) 
VALUES ('Pacote de Fraldas', 62.45);

INSERT INTO estoque (id_item, quantidade_atual) 
VALUES (4, 67);

INSERT INTO itens (nome, preco) 
VALUES ('Curativo Adesivo', 5.25);

INSERT INTO estoque (id_item, quantidade_atual) 
VALUES (5, 4);

INSERT INTO itens (nome, preco) 
VALUES ('Shampoo e Condicionador', 78.55);

INSERT INTO estoque (id_item, quantidade_atual) 
VALUES (6, 88);

INSERT INTO itens (nome, preco) 
VALUES ('Protetor Solar', 84.29);

INSERT INTO estoque (id_item, quantidade_atual) 
VALUES (7, 63);

INSERT INTO itens (nome, preco) 
VALUES ('Álcool 70%', 6.27);

INSERT INTO estoque (id_item, quantidade_atual) 
VALUES (8, 71);

INSERT INTO itens (nome, preco) 
VALUES ('Analgésico ', 20.27);

INSERT INTO estoque (id_item, quantidade_atual) 
VALUES (9, 11);

INSERT INTO itens (nome, preco) 
VALUES ('Creme hidratante', 27.68);

INSERT INTO estoque (id_item, quantidade_atual) 
VALUES (10, 52);