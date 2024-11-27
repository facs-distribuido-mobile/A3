const dbConnection = require('../config/conexao');
const middleware = require('../middlewares/general');

class ItemEstoqueDao {

    total(callback) {
        let sql = `SELECT count(*) as count FROM estoque`;

        dbConnection.createConnection().query(sql, [], (err, total) => {
            if (err || total === undefined) {
                callback("Not Found", null)
            } else {
                callback(null, total.count);
            }
        })
    }

    all(callback) {
        let sql = `SELECT * FROM estoque LEFT JOIN itens on estoque.id_item = item.id`;

        dbConnection.createConnection().query(sql, [], (err, itens_estoque) => {
            if(err || itens_estoque === undefined) {
                callback("Not found", null);
            } else {
                itens_estoque.forEach(item_estoque => {
                    item_estoque.preco = middleware.centsToReal(item_estoque.preco)
                });
                callback(null, itens_estoque)
            }
        })
    }

    get(id, callback) {
        let sql;
        sql = `SELECT * FROM estoque LEFT JOIN itens on estoque.id_item = item.id
                       WHERE id = ?`;

        dbConnection.createConnection().query(sql, id, (err, itens_estoque) => {
            if (err || itens_estoque.length === 0) {
                callback("Not found", null);
            } else {
                itens_estoque[0].preco = middleware.centsToReal(itens_estoque[0].preco);
                callback(null, itens_estoque[0]);
            }
        })
    }

    adicionar(item_estoque) {
        const sql = `INSERT INTO estoque(id_item, quantidade) VALUES(?, ?)`;
        const params = [item_estoque.id.trim(), item_estoque.quantidade.trim()];

        dbConnection.createConnection().query(sql, params);
    }

    modificar(id, item_estoque_quantidade) {
        const sql = `UPDATE estoque set quantidade = ? WHERE id = ?`;
        const params = [item_estoque_quantidade.trim(), id];

        dbConnection.createConnection().query(sql, params);
    }

    delete(id, callback) {
        let sql = `DELETE FROM estoque WHERE id = ?`;

        dbConnection.createConnection().query(sql, id, (err, item) => {
            if(err || item.affectedRows === 0) {
                callback("Not found", null);
            } else {
                callback(null, item);
            }
        })
    }

}

module.exports = new ItemEstoqueDao();

