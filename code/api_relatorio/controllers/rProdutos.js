const RProdutosDao = require('../dao/RProdutosDao');
const ProdutosRelatorio = require('../models/ProdutosRelatorio');
const middlewares = require('../middlewares/general');

module.exports = app => {

    app.get('/relatorios/produtos/melhor', (req,res) => {
        try {
            RProdutosDao.getBestSeller((err, result) => {
                if(err !== null || result === undefined) {
                    return res.status(500).send(`Erro ao consultar banco de dados`);
                } else if (result.length === 0) {
                    return res.status(404).send(`Não há itens para geração de relatório`)
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
                RProdutosDao.getOtherStatusSeller(status, (err, result) => {
                    if(err !== null || result === undefined) {
                        return res.status(500).send(`Erro ao consultar banco de dados`);
                    } else if (result.length === 0) {
                        return res.status(404).send(`Não há itens para geração de relatório`)
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