const dbConnection = require('../config/conexao');
const middlewares = require('../middlewares/general');

class REstoqueDao {

    getLowEstoque(lowNum, callback) {
        const sql = `SELECT 
                                itens.id as id_item, 
                                itens.nome, itens.preco, 
                                estoque.quantidade_atual 
                            FROM itens LEFT JOIN estoque on itens.id = estoque.id_item
                            WHERE estoque.quantidade_atual < ${lowNum}`;

        dbConnection.createConnection().query(sql, (err, result) => {
            if(err !== null) {
                callback(`Erro no banco de dados`, null);
            } else {
                if(result !== undefined && result.length) {
                    result.forEach(item => {
                        item.preco = middlewares.centsToReal(item.preco);
                    })
                }
                callback(null, result);
            }
        });
    }

    getZeroEstoque(callback) {
        const sql = `SELECT 
                                itens.id as id_item, 
                                itens.nome, itens.preco, 
                                estoque.quantidade_atual 
                            FROM itens LEFT JOIN estoque on itens.id = estoque.id_item
                            WHERE estoque.quantidade_atual = 0`;

        dbConnection.createConnection().query(sql, (err, result) => {
            if(err !== null) {
                callback(`Erro no banco de dados`, null);
            } else {
                if(result !== undefined && result.length) {
                    result.forEach(item => {
                        item.preco = middlewares.centsToReal(item.preco);
                    })
                }
            }
            callback(null, result);
        })
    }

}

module.exports = new REstoqueDao();