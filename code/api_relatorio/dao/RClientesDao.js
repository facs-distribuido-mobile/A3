const dbConnection = require('../config/conexao');

class RClientesDao {

    async getClientById(id) {
        const sql = `SELECT clientes.nome, clientes.email FROM clientes WHERE id = ?`;
        const result = await dbConnection.createConnection().query(sql, id);
        return result.rows;
    }

    getAllProductsByClientId(id, callback) {
        const searchVendas = `SELECT itens.nome, itens.preco 
                                FROM itens LEFT JOIN vendas_detalhes ON itens.id = vendas_detalhes.id_item 
                                    LEFT JOIN vendas ON vendas_detalhes.id_venda = vendas.id
                                            WHERE vendas.id_cliente = ?`

        const searchClient = this.getClientById(id).then(value => {
            console.log(value);
        });


        // dbConnection.createConnection().query(searchVendas, id, (err, result) => {
        //     if(err || result === undefined) {
        //         callback("Not Found", null);
        //     } else {
        //         callback(null, result);
        //     }
        // })
    }

    getBigSaleById(id, callback) {

    }

    getSmallSaleById(id, callback) {

    }

}

module.exports = new RClientesDao();