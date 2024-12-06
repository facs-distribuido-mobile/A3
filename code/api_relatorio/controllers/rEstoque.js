const REstoqueDao = require('../dao/REstoqueDao');

module.exports = app => {

    app.get('/relatorios/estoque/baixo', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const lowNum = 50;

        try {
            REstoqueDao.getLowEstoque(lowNum,(err, result) => {
                if(err !== null || result === undefined) {
                    return res.status(500).send({ erro: `Erro ao consultar banco de dados.` });
                } else if (result.length === 0) {
                    return res.status(404).send({ erro: `Não há itens com estoque baixo!` });
                } else {
                    return res.status(200).send(result);
                }
            });
        } catch (err) {
            console.log(`Erro: ${err}`);
            return res.status(500).send({ erro: 'Erro no servidor.' });
        }
    });

    app.get('/relatorios/estoque/zero', (req,res) => {
        res.header("Access-Control-Allow-Origin", "*");
        try {
            REstoqueDao.getZeroEstoque((err, result) => {
                if(err !== null || result === undefined) {
                    return res.status(500).send({ erro: `Erro ao consultar banco de dados.` });
                } else if (result.length === 0) {
                    return res.status(404).send({ erro: `Não há itens com estoque ZERO!` });
                } else {
                    return res.status(200).send(result);
                }
            });
        } catch (err) {
            console.log(`Erro: ${err}`);
            return res.status(500).send({ erro: 'Erro no servidor.' });
        }
    });

}