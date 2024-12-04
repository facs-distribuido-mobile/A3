const dbConnection = require('../config/conexao');
const middlewares = require('../middlewares/general');

class RClientesDao {

    // async getClientById(id) {
    //     const sql = `SELECT clientes.nome, clientes.email FROM clientes WHERE id = ?`;
    //     const result = await dbConnection.createConnection().query(sql, id);
    //     return result.rows;
    // }

    // getAllProductsByClientId(id, callback) {
    //     const searchVendas = `SELECT itens.nome, itens.preco
    //                             FROM itens LEFT JOIN vendas_detalhes ON itens.id = vendas_detalhes.id_item
    //                                 LEFT JOIN vendas ON vendas_detalhes.id_venda = vendas.id
    //                                         WHERE vendas.id_cliente = ?`
    //
    //     const searchClient = this.getClientById(id).then(value => {
    //         console.log(value);
    //     });


        // dbConnection.createConnection().query(searchVendas, id, (err, result) => {
        //     if(err || result === undefined) {
        //         callback("Not Found", null);
        //     } else {
        //         callback(null, result);
        //     }
        // })
    // }

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
                callback(`Erro: ao consultar banco de dados`, null);
            } else if (result[0].nome === undefined || result[0].nome === null){
                callback(`Not Found: cliente não possui vendas completadas`, null);
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
                callback(`Erro: ao consultar banco de dados`, null);
            } else if (resultado[0].nome === undefined || resultado[0].nome === null){
                callback(`Not Found: cliente não possui vendas completadas`, null);
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
                callback(`Erro no banco de dados`, null);
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