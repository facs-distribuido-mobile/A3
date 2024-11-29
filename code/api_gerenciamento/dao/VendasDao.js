const DbConnection = require('../config/conexao');

class VendasDao {

    getAll(callback) {
        const sql = "SELECT vendas.*, JSON_ARRAYAGG(JSON_OBJECT('id_detalhe', vendas_detalhes.id, 'id_item', vendas_detalhes.id_item, 'quantidade', vendas_detalhes.quantidade, 'preco', vendas_detalhes.preco)) as detalhes FROM vendas LEFT JOIN vendas_detalhes ON vendas.id = vendas_detalhes.id_venda GROUP BY vendas.id";

        DbConnection.createConnection().query(sql, [], (err, vendas) => {
            if (err) {
                callback(err, null);
            } else if (vendas.length === 0) {
                callback('Not found', null);
            } else {
                callback(null, vendas);
            }
        });
    }

    get(id, callback) {
        const sql = "SELECT vendas.*, JSON_ARRAYAGG(JSON_OBJECT('id_detalhe', vendas_detalhes.id, 'id_item', vendas_detalhes.id_item, 'quantidade', vendas_detalhes.quantidade, 'preco', vendas_detalhes.preco)) as detalhes FROM vendas LEFT JOIN vendas_detalhes ON vendas.id = vendas_detalhes.id_venda WHERE vendas.id = ? GROUP BY vendas.id";;

        DbConnection.createConnection().query(sql, [id], (err, vendas) => {
            if (err) {
                callback(err, null);
            } else if (vendas.length === 0) {
                callback('Not found', null);
            } else {
                callback(null, vendas[0]);
            }
        });
    }

    add(venda, callback) {
        const sql = 'INSERT INTO vendas(id_cliente, id_vendedor, data_hora, status, total) VALUES(?, ?, ?, ?, ?)';
        const parametros = [];

        DbConnection.createConnection().query(sql, parametros, (err, dbRes) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, dbRes);
            }
        });
    }

    delete(id, callback) {
        const sql = 'DELETE FROM vendas WHERE id = ?';

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

module.exports = new VendasDao();