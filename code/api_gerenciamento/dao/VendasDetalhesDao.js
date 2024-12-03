const DbConnection = require('../config/conexao');

class VendasDetalhesDao {

    getPrecoQuantidade(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT preco, quantidade_atual FROM itens INNER JOIN estoque ON itens.id = estoque.id_item WHERE itens.id = ?';
            DbConnection.createConnection().query(sql, [id], (err, detalhes) => {
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

    estoqueAfterAdd(detalhe, quantidadeAtual) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE estoque SET quantidade_atual = ? WHERE id_item = ?';
            const parametros = [quantidadeAtual - detalhe.quantidade, detalhe.idItem];

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