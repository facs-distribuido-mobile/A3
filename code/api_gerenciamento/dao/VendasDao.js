const DbConnection = require('../config/conexao');

class VendasDao {

    getAll() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT vendas.*, JSON_ARRAYAGG(JSON_OBJECT('id_detalhe', vendas_detalhes.id, 'id_item', vendas_detalhes.id_item, 'quantidade', vendas_detalhes.quantidade, 'preco', vendas_detalhes.preco)) as detalhes FROM vendas LEFT JOIN vendas_detalhes ON vendas.id = vendas_detalhes.id_venda GROUP BY vendas.id";
            const parametros = [];

            DbConnection.createConnection().query(sql, parametros, (err, vendas) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(vendas);
                }
            });
        });
    }

    get(id) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT vendas.*, JSON_ARRAYAGG(JSON_OBJECT('id_detalhe', vendas_detalhes.id, 'id_item', vendas_detalhes.id_item, 'quantidade', vendas_detalhes.quantidade, 'preco', vendas_detalhes.preco)) as detalhes FROM vendas LEFT JOIN vendas_detalhes ON vendas.id = vendas_detalhes.id_venda WHERE vendas.id = ? GROUP BY vendas.id";
            const parametros = [id];

            DbConnection.createConnection().query(sql, parametros, (err, vendas) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(vendas[0]);
                }
            });
        });
    }

    add(venda) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO vendas(id_cliente, id_vendedor, data_hora, status, total) VALUES(?, ?, ?, ?, ?)';
            const parametros = [venda.idCliente, venda.idVendedor, venda.dataHora, venda.status, venda.total];

            DbConnection.createConnection().query(sql, parametros, (err, dbRes) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(dbRes);
                }
            });
        });
    }

    update(id, venda) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE vendas SET status = ? WHERE id = ?';
            const parametros = [venda.status, id];

            DbConnection.createConnection().query(sql, parametros, (err, dbRes) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(dbRes);
                }
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM vendas WHERE id = ?';
            const parametros = [id];

            DbConnection.createConnection().query(sql, parametros, (err, dbRes) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(dbRes);
                }
            });
        });
    }

}

module.exports = new VendasDao();