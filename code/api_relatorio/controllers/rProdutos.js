const RProdutosDao = require('../dao/RProdutosDao');
const middlewares = require('../middlewares/general');

module.exports = app => {

    app.get('/relatorios/produtos/melhor', (req,res) => {
        res.header("Access-Control-Allow-Origin", "*");
        try {
            RProdutosDao.getBestSeller((err, result) => {
                if(err !== null || result === undefined || result === null) {
                    return res.status(404).send({ erro: `${err}` });
                } else {
                    return res.status(200).send(result);
                }
            });
        } catch (err) {
            console.log(`Erro: ${err}`);
            return res.status(500).send({ erro: 'Erro no servidor.' });
        }
    });

    app.get('/relatorios/produtos/outros-status', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const status = req.body.status;

            if(!middlewares.checarEntradaString(status)) {
                return res.status(400).send({ erro: `O campo 'status' é obrigatório!` });
            } else if (status.trim() === 'pendente' || status.trim() === 'cancelado') {
                try{
                    RProdutosDao.getOtherStatusSeller(status.trim(), (err, result) => {
                        if(err !== null || result === undefined || result === null) {
                            return res.status(404).send({ erro: `${err}` });
                        } else {
                            return res.status(200).send(result);
                        }
                    });
                } catch (err) {
                    console.log(`Erro: ${err}`);
                    return res.status(500).send({ erro: 'Erro no servidor.' });
                }
            } else {
                return res.status(400).send({ erro: `O campo status somente pode ser 'cancelado' ou 'pendente'.` });
            }
    });

}