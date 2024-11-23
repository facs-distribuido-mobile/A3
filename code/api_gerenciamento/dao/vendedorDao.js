const db = require('../config/conexao');

const vendedorDao = {
    // Inserir novo vendedor
    create: (nome, cpf, callback) => {
        const query = 'INSERT INTO vendedores (nome, cpf) VALUES (?, ?)';
        db.createConnection().query(query, [nome, cpf], callback);
    },

    // Verificar se o CPF já existe
    checkCpfExists: (cpf, callback) => {
        const query = 'SELECT id FROM vendedores WHERE cpf = ?';
        db.createConnection().query(query, [cpf], callback);
    },

    // Obter todos os vendedores
    getAll: (callback) => {
        const query = 'SELECT * FROM vendedores';
        db.createConnection().query(query, callback);
    },

    // Obter vendedor por ID
    getById: (id, callback) => {
        const query = 'SELECT * FROM vendedores WHERE id = ?';
        db.createConnection().query(query, [id], callback);
    },

    // Atualizar vendedor por ID
    update: (id, nome, cpf, callback) => {
        const query = 'UPDATE vendedores SET nome = ?, cpf = ? WHERE id = ?';
        db.createConnection().query(query, [nome, cpf, id], callback);
    },

    // Deletar vendedor por ID
    delete: (id, callback) => {
        const query = 'DELETE FROM vendedores WHERE id = ?';
        db.createConnection().query(query, [id], callback);
    }
};

module.exports = vendedorDao;