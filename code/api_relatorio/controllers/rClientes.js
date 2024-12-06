const RClientesDao = require('../dao/RClientesDao');

module.exports = app => {

    app.get('/relatorios/clientes/produtos', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const idNum = req.body.id;

        if (!idNum) {
            return res.status(400).send({ erro: `O parâmetro de id é obrigatório!` });
        } else if (isNaN(idNum) || typeof idNum === 'string' && !idNum.trim() || typeof idNum === 'boolean') {
            return res.status(400).send({ erro: `O parâmetro de id deve ser um número!` });
        } else {
            try {
                RClientesDao.getAllProductsByClientId(idNum, (err, result) => {
                    if (err !== null) {
                        return res.status(404).send({ erro: `${err}` });
                    } else if (result === null) {
                        return res.status(404).send({ erro: `${err}` });
                    } else {
                        return res.status(200).send(result);
                    }
                });
            } catch (err) {
                console.log(`Erro: ${err}`);
                return res.status(500).send({ erro: 'Erro no servidor.' });
            }
        }
    });

    app.get('/relatorios/clientes/consumo-medio', (req,res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const idNum = req.body.id;

        if(!idNum) {
            return res.status(400).send({ erro: `O parâmetro de id é obrigatório!` });
        } else if (isNaN(idNum) || typeof idNum === 'string' && !idNum.trim() || typeof idNum === 'boolean') {
            return res.status(400).send({ erro: `O parâmetro de id deve ser um número!` });
        } else {
            try {
              RClientesDao.getAverageConsumptionById(Number(idNum), (err, result) => {
                    if(err !== null) {
                        return res.status(404).send({ erro: `${err}` });
                    } else if (result === null) {
                        return res.status(404).send({ erro: `${err}` });
                    } else {
                        return res.status(200).send(result);
                    }
              });
            } catch (err) {
                console.log(`Erro: ${err}`);
                return res.status(500).send({ erro: 'Erro no servidor.' });
            }
        }
    });

    app.get('/relatorios/clientes/consumo-total', (req,res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const idNum = req.body.id;

        if(!idNum) {
            return res.status(400).send({ erro: `O parâmetro de id é obrigatório!` });
        } else if (isNaN(idNum) || typeof idNum === 'string' && !idNum.trim() || typeof idNum === 'boolean') {
            return res.status(400).send({ erro: `O parâmetro de id deve ser um número!` });
        } else {
            try {
                RClientesDao.getTotalConsumptionById(Number(idNum), (err, result) => {
                    if(err !== null) {
                        return res.status(404).send({ erro: `${err}` });
                    } else if (result === null) {
                        return res.status(404).send({ erro: `${err}` });
                    } else {
                        return res.status(200).send(result);
                    }
                });
            } catch (err) {
                console.log(`Erro: ${err}`);
                return res.status(500).send({ erro: 'Erro no servidor.' });
            }
        }
    });

    app.get('/relatorios/clientes/compras', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const idNum = req.body.id;

        if(!idNum) {
            return res.status(400).send({ erro: `O parâmetro de id é obrigatório!` });
        } else if (isNaN(idNum) || typeof idNum === 'string' && !idNum.trim() || typeof idNum === 'boolean') {
            return res.status(400).send({ erro: `O parâmetro de id deve ser um número!` });
        } else {
            try {
                RClientesDao.getPurchasesById(Number(idNum), (err, result) => {
                    if(err !== null) {
                        return res.status(404).send({ erro: `${err}` });
                    } else if (result === null) {
                        return res.status(404).send({ erro: `${err}` });
                    } else {
                        return res.status(200).send(result);
                    }
                });
            } catch (err) {
                console.log(`Erro: ${err}`);
                return res.status(500).send({ erro: 'Erro no servidor.' });
            }
        }

    });

}