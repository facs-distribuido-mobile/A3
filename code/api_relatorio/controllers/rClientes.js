const RClientesDao = require('../dao/RClientesDao');

module.exports = app => {

    // app.get('/relatorios/clientes/produto/:id', (req, res) => {
    //     const idNum = req.params.id;
    //
    //     try {
    //         if(!idNum) {
    //             return res.status(400).send(`Erro: deve ser enviado um id de cliente!`);
    //         } else if(isNaN(idNum)) {
    //             return res.status(400).send(`Erro: número de id do cliente inválido`);
    //         } else {
    //             RClientesDao.getAllProductsByClientId(idNum, (err, result) => {
    //                 if(err === null) {
    //                     console.log(result);
    //                     // return res.status(200).send(`${result}`);
    //                 } else {
    //                     return res.status(404).send(`Erro: Not Found`);
    //                 }
    //             })
    //         }
    //     } catch (err) {
    //         return res.status(500).send(`Erro: ${err.message}`);
    //     }
    // });

    app.get('/relatorios/clientes/consumo-medio', (req,res) => {
        const idNum = req.body.id;

        if(!idNum) {
            return res.status(400).send(`Erro: o parâmetro de id é obrigatório!`);
        } else if (isNaN(idNum)) {
            return res.status(400).send(`Erro: o parâmetro de id deve ser um número!`);
        } else {
            try {
              RClientesDao.getAverageConsumptionById(Number(idNum), (err, result) => {
                    if(err !== null) {
                        return res.status(404).send(`${err}`);
                    } else if (result === null) {
                        return res.status(404).send(`${err}`)
                    } else {
                        return res.status(200).send(result);
                    }
              });
            } catch (err) {
                return res.status(500).send(`Erro: ${err.message}`);
            }
        }
    })

    app.get('/relatorios/clientes/consumo-total', (req,res) => {
        const idNum = req.body.id;

        if(!idNum) {
            return res.status(400).send(`Erro: o parâmetro de id é obrigatório!`);
        } else if (isNaN(idNum)) {
            return res.status(400).send(`Erro: o parâmetro de id deve ser um número!`);
        } else {
            try {
                RClientesDao.getTotalConsumptionById(Number(idNum), (err, result) => {
                    if(err !== null) {
                        return res.status(404).send(`${err}`);
                    } else if (result === null) {
                        return res.status(404).send(`${err}`)
                    } else {
                        return res.status(200).send(result);
                    }
                });
            } catch (err) {
                return res.status(500).send(`Erro: ${err.message}`);
            }
        }
    });

    app.get('/relatorios/clientes/compras', (req, res) => {
        const idNum = req.body.id;

        if(!idNum) {
            return res.status(400).send(`Erro: o parâmetro de id é obrigatório!`);
        } else if (isNaN(idNum)) {
            return res.status(400).send(`Erro: o parâmetro de id deve ser um número!`);
        } else {
            try {
                RClientesDao.getPurchasesById(Number(idNum), (err, result) => {
                    if(err !== null) {
                        return res.status(404).send(`${err}`);
                    } else if (result === null) {
                        return res.status(404).send(`${err}`)
                    } else {
                        return res.status(200).send(result);
                    }
                });
            } catch (err) {
                return res.status(500).send(`Erro: ${err.message}`);
            }
        }

    })

}