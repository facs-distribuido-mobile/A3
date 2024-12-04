const dbConnection = require('../config/conexao');
const middlewares = require('../middlewares/general');

class RClientesDao {

     getAllProductsByClientId(id, callback) {
        const sql = `SELECT
                        clientes.nome as nome_cliente,
                        clientes.email as email_cliente,
                        vendas_detalhes.id_venda as id_venda,
                        vendas_detalhes.quantidade as quantidade_produto,
                        itens.nome as nome_item,
                        itens.preco as preco_item
                    FROM clientes LEFT JOIN vendas ON clientes.id = vendas.id_cliente
                    LEFT JOIN vendas_detalhes ON vendas.id = vendas_detalhes.id_venda
                    LEFT JOIN itens ON vendas_detalhes.id_item = itens.id
                    WHERE vendas.status = 'completo' AND quantidade IS NOT NULL AND clientes.id = ?`

        dbConnection.createConnection().query(sql, id, (err, result) => {
            if(err !== null) {
                callback("Erro ao consultar", null);
            } else if(result.length === 0) {
                callback("Not Found: cliente não possui compras completadas", null)
            } else {
                if(result.length > 0) {
                    result.forEach(item => {
                        item.preco_item = middlewares.centsToReal(item.preco_item)
                    })
                }
                callback(null, result);
            }
        })
    }

    getAverageConsumptionById(id, callback) {
        const sql = `SELECT 
                                clientes.nome, 
                                clientes.email, 
                                AVG(vendas.total) as consumo_medio 
                            FROM clientes LEFT JOIN vendas 
                            ON clientes.id = vendas.id_cliente 
                            WHERE clientes.id = ? 
                            AND vendas.status = 'completo'`

        dbConnection.createConnection().query(sql, id, (err, result) => {
            if(err !== null) {
                callback(`Erro ao consultar banco de dados`, null);
            } else if (result[0].nome === undefined || result[0].nome === null){
                callback(`Not Found: cliente não possui compras completadas`, null);
            } else {
                if(result.length > 0) {
                    result.forEach(item => {
                        item.consumo_medio = middlewares.centsToReal(item.consumo_medio);
                    })
                }
                callback(null, result);
            }
        });
    }

    getTotalConsumptionById(id, callback) {
        const sql = `SELECT 
                                clientes.nome, 
                                clientes.email, 
                                SUM(vendas.total) as consumo_total 
                            FROM clientes LEFT JOIN vendas 
                            ON clientes.id = vendas.id_cliente 
                            WHERE clientes.id = ? 
                            AND vendas.status = 'completo'`

        dbConnection.createConnection().query(sql, id, (err, resultado) => {
            if(err !== null) {
                callback(`Erro ao consultar banco de dados`, null);
            } else if (resultado[0].nome === undefined || resultado[0].nome === null){
                callback(`Not Found: cliente não possui compras completadas`, null);
            } else {
                if(resultado.length > 0) {
                    resultado.forEach(item => {
                        item.consumo_total = middlewares.centsToReal(item.consumo_total);
                    })
                }
                callback(null, resultado);
            }
        });
    }

    getPurchasesById(id, callback) {
        const sql = `SELECT 
                                clientes.nome as cliente, 
                                clientes.email as email_cliente, 
                                vendedores.nome as vendedor,
                                vendas.data_hora,
                                vendas.status,
                                vendas.total 
                            FROM clientes LEFT JOIN vendas 
                                ON clientes.id = vendas.id_cliente 
                                LEFT JOIN vendedores ON vendas.id_vendedor = vendedores.id 
                            WHERE vendas.status = 'completo' AND clientes.id = ?`

        dbConnection.createConnection().query(sql, id, (err, result) => {
            if(err !== null) {
                callback(`Erro ao consultar banco de dados`, null);
            } else if(result.length === 0) {
                callback(`Not Found: cliente não possui compras completadas`, null);
            } else {
                if(result.length > 0) {
                    result.forEach(item => {
                        item.data_hora = item.data_hora.toLocaleString();
                        item.total = middlewares.centsToReal(item.total);
                    })
                }
                callback(null, result);
            }
        })

    }

}

module.exports = new RClientesDao();