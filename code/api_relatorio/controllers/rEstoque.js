const REstoqueDao = require('../dao/REstoqueDao');

module.exports = app => {

    app.get('/relatorios/estoque/baixo', (req, res) => {
        const lowNum = 50;

        try {
            REstoqueDao.getLowEstoque(lowNum,(err, result) => {
                if(err !== null || result === undefined) {
                    return res.status(500).send(`Erro ao consultar banco de dados`);
                } else if (result.length === 0) {
                    return res.status(404).send(`Não há itens com estoque baixo!`);
                } else {
                    return res.status(200).send(result);
                }
            })
        } catch (err) {
            return res.status(500).send(`Erro: ${err.message}`);
        }
    });

    app.get('/relatorios/estoque/zero', (req,res) => {
        try {
            REstoqueDao.getZeroEstoque((err, result) => {
                if(err !== null || result === undefined) {
                    return res.status(500).send(`Erro ao consultar banco de dados`);
                } else if (result.length === 0) {
                    return res.status(404).send(`Não há itens com estoque ZERO!`);
                } else {
                    return res.status(200).send(result);
                }
            })
        } catch (err) {
            return res.status(500).send(`Erro: ${err.message}`);
        }
    })

}