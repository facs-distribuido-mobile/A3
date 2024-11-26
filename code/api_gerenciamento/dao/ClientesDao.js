const DbConnection = require('../config/conexao');

class ClientesDao {

    total(callback) {
        const sql = 'SELECT count(*) as count FROM clientes';

        DbConnection.createConnection().query(sql, [], (err, total) => {
            if (err || total === undefined) {
                callback('Not Found', null)
            } else {
                callback(null, total.count);
            }
        });
    }

    all(callback) {
        const sql = 'SELECT * FROM clientes';

        DbConnection.createConnection().query(sql, [], (err, clientes) => {
            if (err || clientes === undefined) {
                callback('Not found', null);
            } else {
                callback(null, clientes)
            }
        });
    }

    get(id, callback) {
        const sql = 'SELECT * FROM clientes WHERE id = ?';

        DbConnection.createConnection().query(sql, [id], (err, clientes) => {
            if (err || clientes.length === 0) {
                callback('Not found', null);
            } else {
                callback(null, clientes[0]);
            }
        });
    }

    adicionar(cliente) {
        let sql = '';
        const parametros = [];

            if (cliente.id !== undefined) {
                sql = 'UPDATE clientes SET nome = ?, cpf = ?, email = ? WHERE id = ?';
                parametros = [cliente.nome, cliente.cpf, cliente.email, cliente.id];
            } else {
                sql = 'INSERT INTO clientes(nome, preco, unidades) VALUES(?, ?, ?)';
                parametros = [cliente.nome, cliente.cpf, cliente.email];
            }

        DbConnection.createConnection().query(sql, parametros);
    }

    delete(id, callback) {
        const sql = 'DELETE FROM clientes WHERE id = ?';

        DbConnection.createConnection().query(sql, [id], (err, cliente) => {
            if(err || cliente.affectedRows === 0) {
                callback('Not found', null);
            } else {
                callback(null, cliente);
            }
        });
    }

}

module.exports = new ClientesDao();