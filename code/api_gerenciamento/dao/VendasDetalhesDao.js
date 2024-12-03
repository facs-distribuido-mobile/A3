const DbConnection = require('../config/conexao');

class VendasDetalhesDao {

    getPrecoQuantidade(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT preco, quantidade_atual FROM itens INNER JOIN estoque ON itens.id = estoque.id_item WHERE itens.id = ?';
            const parametros = [id];

            DbConnection.createConnection().query(sql, parametros, (err, detalhes) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(detalhes[0]);
                }
            });
        });
    }

    add(id, detalhe) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO vendas_detalhes(id_venda, id_item, quantidade, preco) VALUES(?, ?, ?, ?)';
            const parametros = [id, detalhe.idItem, detalhe.quantidade, detalhe.preco];

            DbConnection.createConnection().query(sql, parametros, (err, dbRes) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(dbRes);
                }
            });
        });
    }

    estoqueAfterAddUpdate(detalhe, op) {
        return new Promise((resolve, reject) => {
            let sql;
            if (op === 'reduzir') {
                sql = 'UPDATE estoque SET quantidade_atual = quantidade_atual - ? WHERE id_item = ?';
            }
            if (op === 'incrementar') {
                sql = 'UPDATE estoque SET quantidade_atual = quantidade_atual + ? WHERE id_item = ?';
            }
            const parametros = [detalhe.quantidade, detalhe.idItem];

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

module.exports = new VendasDetalhesDao();