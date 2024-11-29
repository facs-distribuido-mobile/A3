const DbConnection = require('../config/conexao');

class ClientesDao {

    getAll(callback) {
        const sql = 'SELECT * FROM clientes';

        DbConnection.createConnection().query(sql, [], (err, clientes) => {
            if (err) {
                callback(err, null);
            } else if (clientes.length === 0) {
                callback('Not found', null);
            } else {
                callback(null, clientes);
            }
        });
    }

    get(id, callback) {
        const sql = 'SELECT * FROM clientes WHERE id = ?';

        DbConnection.createConnection().query(sql, [id], (err, clientes) => {
            if (err) {
                callback(err, null);
            } else if (clientes.length === 0) {
                callback('Not found', null);
            } else {
                callback(null, clientes[0]);
            }
        });
    }

    add(cliente, callback) {
        const sql = 'INSERT INTO clientes(nome, cpf, email) VALUES(?, ?, ?)';
        const parametros = [cliente.nome, cliente.cpf, cliente.email];

        DbConnection.createConnection().query(sql, parametros, (err, dbRes) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, dbRes);
            }
        });
    }

    update(id, cliente, callback) {
        const sql = 'UPDATE clientes SET nome = ?, cpf = ?, email = ? WHERE id = ?';
        const parametros = [cliente.nome, cliente.cpf, cliente.email, id];

        DbConnection.createConnection().query(sql, parametros, (err, dbRes) => {
            if (err) {
                callback(err, null);
            } else if (dbRes.affectedRows === 0) {
                callback('Not found', null);
            } else {
                callback(null, dbRes);
            }
        });
    }

    delete(id, callback) {
        const sql = 'DELETE FROM clientes WHERE id = ?';

        DbConnection.createConnection().query(sql, [id], (err, dbRes) => {
            if (err) {
                callback(err, null);
            } else if (dbRes.affectedRows === 0) {
                callback('Not found', null);
            } else {
                callback(null, dbRes);
            }
        });
    }

}

module.exports = new ClientesDao();