const ItemDao = require('../dao/ItemDao');
const middleware = require('../middlewares/general');

module.exports = app => {
    app.get('/estoque', (req, res) => {
        ItemDao.all((err, item) => {
            res.header("Access-Control-Allow-Origin", "*");
            if(err === null) {
                res.status(200).send(item);
            } else {
                res.status(404).send(`Not Found`);
            }
        })
    })

    app.get('/estoque/:id', (req, res) => {
        let idNum = req.params.id;

        ItemDao.get(idNum, (err, item) => {
            if(err === null) {
                res.status(200).send(item);
            } else {
                res.status(404).send(`Erro: Not Found`);
            }
        })
    })

    app.post('/estoque', (req, res) => {
        const newItem = req.body;

        if(!newItem.nome.trim() || Number(!newItem.preco.trim()) || Number(!newItem.unidades.trim())) {
            res.status(400).send(`Os campos nome, preço e unidades são obrigatórios`)
        } else if (middleware.verificaNegativo(middleware.realToCents(newItem.preco))) {
            res.status(400).send(`O campo preço não pode ser negativo!`)
        } else if (middleware.verificaNegativo(newItem.unidades)) {
            res.status(400).send(`O campos unidades não pode ser negativo!`)
        } else {
            try {
                ItemDao.adicionar(newItem);
                res.status(200).send(`Item cadastrado com sucesso:
                                        nome: ${newItem.nome.trim()},
                                        preço: ${newItem.preco.trim()},
                                        unidades: ${middleware.decimalsToInt(newItem.unidades.trim())}`);
            } catch (err) {
                res.status(500).send(`Erro: ${err.message}`)
            }
        }
    })

    app.delete('/estoque/:id', (req, res) => {
        let idNum = req.params.id;

        ItemDao.delete(idNum, (err, item) => {
            if(err === null) {
                res.status(200).send(`Item de id ${idNum} excluído com sucesso!`);
            } else {
                res.status(404).send(`Erro: Not Found`);
            }
        })
    })
}