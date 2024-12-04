const dbConnection = require('../config/conexao');
const middleswares = require('../middlewares/general');

class RProdutosDao {

    getBestSeller(callback) {
        const sql = `SELECT
                                vendas_detalhes.id_item,
                                itens.nome,
                                itens.preco,
                                SUM(vendas_detalhes.quantidade) as total_vendas
                            FROM vendas_detalhes
                              LEFT JOIN itens ON vendas_detalhes.id_item = itens.id
                              LEFT JOIN vendas ON vendas_detalhes.id_venda = vendas.id
                            WHERE STATUS = 'completo'
                            GROUP BY vendas_detalhes.id_item
                            ORDER BY total_vendas DESC`

        dbConnection.createConnection().query(sql, (err, result) => {
            if(err !== null) {
                callback(`Erro no banco de dados`, null);
            } else if (result.length === 0) {
                callback(`Não há itens para geração de relatório`, null);
            } else {
                if(result.length > 0) {
                    result.forEach(item => {
                        item.preco = middleswares.centsToReal(item.preco);
                    })
                }
                callback(null, result);
            }
        })
    }

    getOtherStatusSeller(status, callback) {
        const sql = `SELECT 
                                vendas_detalhes.id_item,
                                itens.nome,
                                itens.preco,
                                SUM(vendas_detalhes.quantidade) as total_vendas
                            FROM vendas_detalhes
                              LEFT JOIN itens ON vendas_detalhes.id_item = itens.id
                              LEFT JOIN vendas ON vendas_detalhes.id_venda = vendas.id
                            WHERE STATUS = ?
                            GROUP BY vendas_detalhes.id_item
                            ORDER BY total_vendas DESC`

        dbConnection.createConnection().query(sql, status, (err, resultado) => {
            if(err !== null) {
                callback(`Erro no banco de dados`, null);
            } else if(resultado.length === 0) {
                callback(`Not Found: não há itens para geração de relatório`, null)
            } else {
                if(resultado.length > 0) {
                    resultado.forEach(item => {
                        item.preco = middleswares.centsToReal(item.preco);
                    })
                }
                callback(null, resultado);
            }
        });
    };

}

module.exports = new RProdutosDao();
