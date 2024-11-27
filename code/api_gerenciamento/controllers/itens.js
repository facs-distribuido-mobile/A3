const ItemDao = require('../dao/ItensDao');
const middleware = require('../middlewares/general');
const Item = require('../models/Item');

module.exports = app => {
    // Retornar todas as entradas da tabela itens
    app.get('/itens', (req, res) => {

        try {
            ItemDao.all((err, itens) => {
                res.header("Access-Control-Allow-Origin", "*");
                if(err === null) {
                    res.status(200).send(itens);
                } else {
                    res.status(404).send(`Erro: Not Found`);
                }
            })
        } catch (err) {
            res.status(500).send(`Erro: ${err.message}`);
        }
    })

    // Retornar uma entrada da tabela item, por id
    app.get('/itens/:id', (req, res) => {
        const idNum = req.params.id;

        try {
            ItemDao.get(idNum, (err, item) => {
                if(err === null) {
                    res.status(200).send(item);
                } else {
                    res.status(404).send(`Erro: Not Found`);
                }
            })
        } catch (err) {
            res.status(500).send(`Erro: ${err.message}`);
        }
    })

    // Adicionar ou atualizar uma entrada da tabela item
    app.post('/itens', (req, res) => {
        const itemBody = req.body;

        if(itemBody.nome === undefined || itemBody.preco === undefined) {
            res.status(400).send(`Os campos nome e preço são obrigatórios!`)
        } else {
            try {
                const item = new Item(itemBody.nome, itemBody.preco);
                if(item.nome === undefined || item.preco === undefined) {
                    res.status(400).send(`Você mandou dados errados`)
                } else {
                    ItemDao.adicionar(item);
                    res.status(200).send(`Item cadastrado com sucesso:
                                        nome: ${item.nome},
                                        preço: ${item.preco}`);
                }

            } catch (err) {
                res.status(500).send(`Erro: ${err.message}`)
            }
        }
    })

    app.delete('/itens/:id', (req, res) => {
        const idNum = req.params.id;

        ItemDao.delete(idNum, (err, item) => {
            if(err === null) {
                res.status(200).send(`Item de id ${idNum} excluído com sucesso!`);
            } else {
                res.status(404).send(`Erro: Not Found`);
            }
        })
    })
}