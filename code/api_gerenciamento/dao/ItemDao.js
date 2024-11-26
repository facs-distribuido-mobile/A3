const DbConnection = require('../config/conexao');
const middleware = require('../middlewares/general');
const {realToCents, centsToReal} = require("../middlewares/general");

class ItemDao {

    total(callback) {
        let sql = `SELECT count(*) as count FROM itens`;

        DbConnection.createConnection().query(sql, [], (err, total) => {
            if (err || total === undefined) {
                callback("Not Found", null)
            } else {
                callback(null, total.count);
            }
        })
    }

    all(callback) {
        let sql = `SELECT * FROM itens`;

        DbConnection.createConnection().query(sql, [], (err, itens) => {
            if(err || itens === undefined) {
                callback("Not found", null);
            } else {
                itens.forEach(item => {
                    item.preco = middleware.centsToReal(item.preco)
                });
                callback(null, itens)
            }
        })
    }

    get(id, callback) {
        let sql = `SELECT * FROM itens WHERE id = ?`;

        DbConnection.createConnection().query(sql, [id], (err, itens) => {
            if(err || itens.length === 0) {
                callback("Not found", null);
            } else {
                itens[0].preco = centsToReal(itens[0].preco);
                callback(null, itens[0]);
            }
        })
    }

    adicionar(item) {
        let sql = '';

            if(item.id !== undefined) {
                sql = `UPDATE itens SET nome = '${item.nome.trim()}', preco = ${middleware.realToCents(item.preco)} WHERE id = ${item.id}`
            } else {
                sql = `INSERT INTO itens(nome, preco) VALUES('${item.nome.trim()}', ${middleware.realToCents(item.preco)})`;
            }

        DbConnection.createConnection().query(sql);
    }

    delete(id, callback) {
        let sql = `DELETE FROM itens WHERE id = ?`;

        DbConnection.createConnection().query(sql, [id], (err, item) => {
            if(err || item.affectedRows === 0) {
                callback("Not found", null);
            } else {
                callback(null, item);
            }
        })
    }

}

module.exports = new ItemDao();