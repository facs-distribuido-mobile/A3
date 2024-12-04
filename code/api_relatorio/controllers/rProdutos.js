const RProdutosDao = require('../dao/RProdutosDao');
const middlewares = require('../middlewares/general');

module.exports = app => {

    app.get('/relatorios/produtos/melhor', (req,res) => {
        try {
            RProdutosDao.getBestSeller((err, result) => {
                if(err !== null || result === undefined || result === null) {
                    return res.status(404).send(`${err}`)
                } else {
                    return res.status(200).send(result);
                }
            });
        } catch (err) {
            return res.status(500).send(`Erro: ${err.message}`);
        }
    });

    app.get('/relatorios/produtos/outros-status', (req, res) => {
        const status = req.body.status;

            if(!middlewares.checarEntradaString(status)) {
                return res.status(404).send(`Erro: o campo 'status' é obrigatório!`);
            } else if (status.trim() === 'pendente' || status.trim() === 'cancelado') {
                try{
                    RProdutosDao.getOtherStatusSeller(status.trim(), (err, result) => {
                        if(err !== null || result === undefined || result === null) {
                            return res.status(404).send(`${err}`);
                        } else {
                            return res.status(200).send(result);
                        }
                    });
                } catch (err) {
                    return res.status(500).send(`Erro: ${err.message}`);
                }
            } else {
                return res.status(404).send(`Erro: o campo status somente pode ser 'cancelado' ou 'pendente'`)
            }
    });

}