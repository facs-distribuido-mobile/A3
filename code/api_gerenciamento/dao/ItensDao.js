const dbConnection = require('../config/conexao');
const middleware = require('../middlewares/general');

class ItemDao {

    total(callback) {
        const sql = `SELECT count(*) as count FROM itens`;

        dbConnection.createConnection().query(sql, [], (err, total) => {
            if (err || total === undefined) {
                callback("Not Found", null);
            } else {
                callback(null, total.count);
            }
        });
    }

    all(callback) {
        const sql = `SELECT * FROM itens`;

        dbConnection.createConnection().query(sql, (err, itens) => {
            if(err || itens === undefined) {
                callback("Not found", null);
            } else {
                itens.forEach(item => {
                    item.preco = middleware.centsToReal(item.preco);
                });
                callback(null, itens);
            }
        });
    }

    get(id, callback) {
        const sql = `SELECT * FROM itens WHERE id = ?`;

        dbConnection.createConnection().query(sql, id, (err, itens) => {
            if(err || itens.length === 0) {
                callback("Not found", null);
            } else {
                itens[0].preco = middleware.centsToReal(itens[0].preco);
                callback(null, itens[0]);
            }
        });
    }

    adicionar(item) {
        const sql = `INSERT INTO itens(nome, preco)
                     VALUES (?, ?)`;
        const params = [item.nome, item.preco];

        dbConnection.createConnection().query(sql, params);
    }

    modificar(id, item) {
        const sql = `UPDATE itens SET nome = ?, preco = ? WHERE id = ?`;
        const params = [item.nome, item.preco, id];

        dbConnection.createConnection().query(sql, params);
    }

    delete(id, callback) {
        const sql = `DELETE FROM itens WHERE id = ?`;

        dbConnection.createConnection().query(sql, [id], (err, item) => {
            if(err || item.affectedRows === 0) {
                callback("Not found", null);
            } else {
                callback(null, item);
            }
        });
    }

}

module.exports = new ItemDao();