SET NAMES 'utf8mb4';

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
	preco INT NOT NULL
);

CREATE TABLE IF NOT EXISTS estoque (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_item INT UNIQUE NOT NULL,
	quantidade_atual INT NOT NULL,
	FOREIGN KEY(id_item) REFERENCES itens(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vendas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_cliente INT,
	id_vendedor INT,
	data_hora DATETIME NOT NULL,
	status VARCHAR(100) NOT NULL,
	total INT NOT NULL,
	FOREIGN KEY(id_cliente) REFERENCES clientes(id) ON DELETE SET NULL,
	FOREIGN KEY(id_vendedor) REFERENCES vendedores(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS vendas_detalhes (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_venda INT,
	id_item INT,
	quantidade INT NOT NULL,
	preco INT NOT NULL,
	FOREIGN KEY(id_venda) REFERENCES vendas(id) ON DELETE SET NULL,
	FOREIGN KEY(id_item) REFERENCES itens(id) ON DELETE SET NULL
);

INSERT INTO clientes (nome, cpf, email)
VALUES ('Otávio Anderson Davi dos Santos', '71072741121', 'otavio_anderson_dossantos@directnet.com.br');

INSERT INTO clientes (nome, cpf, email)
VALUES ('Helena Eloá Alessandra da Cunha', '33620033625', 'helenaeloadacunha@likaleal.com.br');

INSERT INTO clientes (nome, cpf, email)
VALUES ('Bryan Diego Sérgio Aparécio', '38795350942', 'bryan.diego.aparicio@galvao.com');

INSERT INTO clientes (nome, cpf, email)
VALUES ('Liz Luzia Milena Farias', '09615376396', 'liz_luzia_farias@vitacard.com.br');

INSERT INTO clientes (nome, cpf, email)
VALUES ('Antonio Arthur Roberto Moraes', '75315419126', 'antonio.arthur.moraes@athoscontabil.com.br');

INSERT INTO vendedores (nome, cpf)
VALUES ('Andreia Heloise Rezende', '66521905910');

INSERT INTO vendedores (nome, cpf)
VALUES ('Nair Rosângela Olivia Mendes', '01863784756');

INSERT INTO itens (nome, preco)
VALUES ('Suplemento Nutricional', 4935);

INSERT INTO estoque (id_item, quantidade_atual)
VALUES (1, 31);

INSERT INTO itens (nome, preco)
VALUES ('Creme Dental ', 2000);

INSERT INTO estoque (id_item, quantidade_atual)
VALUES (2, 48);

INSERT INTO itens (nome, preco)
VALUES ('Vitaminas C e D', 4228);

INSERT INTO estoque (id_item, quantidade_atual)
VALUES (3, 80);

INSERT INTO itens (nome, preco)
VALUES ('Pacote de Fraldas', 6245);

INSERT INTO estoque (id_item, quantidade_atual)
VALUES (4, 67);

INSERT INTO itens (nome, preco)
VALUES ('Curativo Adesivo', 525);

INSERT INTO estoque (id_item, quantidade_atual)
VALUES (5, 400);

INSERT INTO itens (nome, preco)
VALUES ('Shampoo e Condicionador', 7855);

INSERT INTO estoque (id_item, quantidade_atual)
VALUES (6, 88);

INSERT INTO itens (nome, preco)
VALUES ('Protetor Solar', 8429);

INSERT INTO estoque (id_item, quantidade_atual)
VALUES (7, 63);

INSERT INTO itens (nome, preco)
VALUES ('Álcool 70%', 627);

INSERT INTO estoque (id_item, quantidade_atual)
VALUES (8, 71);

INSERT INTO itens (nome, preco)
VALUES ('Analgésico ', 2027);

INSERT INTO estoque (id_item, quantidade_atual)
VALUES (9, 11);

INSERT INTO itens (nome, preco)
VALUES ('Creme hidratante', 2768);

INSERT INTO estoque (id_item, quantidade_atual)
VALUES (10, 52);

INSERT INTO vendas (id_cliente, id_vendedor, data_hora, status, total)
VALUES (1, 1, '2024-11-27 12:30:00', 'pendente', 7050);

INSERT INTO vendas_detalhes (id_venda, id_item, quantidade, preco)
VALUES (1, 2, 3, 6000);

INSERT INTO vendas_detalhes (id_venda, id_item, quantidade, preco)
VALUES (1, 5, 2, 1050);

INSERT INTO vendas (id_cliente, id_vendedor, data_hora, status, total)
VALUES (4, 2, '2023-02-28 23:59:59', 'finalizado', 20213);

INSERT INTO vendas_detalhes (id_venda, id_item, quantidade, preco)
VALUES (2, 6, 1, 7855);

INSERT INTO vendas_detalhes (id_venda, id_item, quantidade, preco)
VALUES (2, 9, 2, 4054);

INSERT INTO vendas_detalhes (id_venda, id_item, quantidade, preco)
VALUES (2, 10, 3, 8304);

INSERT INTO vendas (id_cliente, id_vendedor, data_hora, status, total)
VALUES (5, 2, '2023-12-25 06:07:33', 'cancelado', 493500);

INSERT INTO vendas_detalhes (id_venda, id_item, quantidade, preco)
VALUES (3, 1, 100, 493500);

INSERT INTO vendas (id_cliente, id_vendedor, data_hora, status, total)
VALUES (2, 1, '2023-12-10 08:07:53', 'finalizado', 11855);

INSERT INTO vendas_detalhes (id_venda, id_item, quantidade, preco)
VALUES (4, 2, 2, 4000);

INSERT INTO vendas_detalhes (id_venda, id_item, quantidade, preco)
VALUES (4, 6, 1, 7855);