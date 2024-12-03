const RClientesDao = require('../dao/RClientesDao');

module.exports = app => {

    app.get('/relatorios/clientes/:id/produto', (req, res) => {
        const idNum = req.params.id;

        try {
            if(!idNum) {
                return res.status(400).send(`Erro: deve ser enviado um id de cliente!`);
            } else if(isNaN(idNum)) {
                return res.status(400).send(`Erro: número de id do cliente inválido`);
            } else {
                RClientesDao.getAllProductsByClientId(idNum, (err, result) => {
                    if(err === null) {
                        console.log(result);
                        // return res.status(200).send(`${result}`);
                    } else {
                        return res.status(404).send(`Erro: Not Found`);
                    }
                })
            }
        } catch (err) {
            return res.status(500).send(`Erro: ${err.message}`);
        }
    });
}