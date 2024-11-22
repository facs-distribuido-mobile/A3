const db = require('../config/conexao');

const vendedorDao = {
    // Inserir novo vendedor
    create: (nome, cpf, callback) => {
        const query = 'INSERT INTO vendedor (nome, cpf) VALUES (?, ?)';
        db.query(query, [nome, cpf], callback);
    },

    // Verificar se o CPF já existe
    checkCpfExists: (cpf, callback) => {
        const query = 'SELECT id FROM vendedor WHERE cpf = ?';
        db.query(query, [cpf], callback);
    },

    // Obter todos os vendedores
    getAll: (callback) => {
        const query = 'SELECT * FROM vendedor';
        db.query(query, callback);
    },

    // Obter vendedor por ID
    getById: (id, callback) => {
        const query = 'SELECT * FROM vendedor WHERE id = ?';
        db.query(query, [id], callback);
    },

    // Atualizar vendedor por ID
    update: (id, nome, cpf, callback) => {
        const query = 'UPDATE vendedor SET nome = ?, cpf = ? WHERE id = ?';
        db.query(query, [nome, cpf, id], callback);
    },

    // Deletar vendedor por ID
    delete: (id, callback) => {
        const query = 'DELETE FROM vendedor WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = vendedorDao;
