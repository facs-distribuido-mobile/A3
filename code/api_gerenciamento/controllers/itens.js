const middleware = require('../middlewares/general');
const ItemDao = require('../dao/ItensDao');
const Item = require('../models/Item');

module.exports = app => {
    // Retornar todas as entradas da tabela itens
    app.get('/itens', (req, res) => {
        try {
            ItemDao.all((err, itens) => {
                res.header("Access-Control-Allow-Origin", "*");
                if(err === null) {
                    return res.status(200).send(itens);
                } else {
                    return res.status(404).send(`Erro: Not Found`);
                }
            })
        } catch (err) {
            return res.status(500).send(`Erro: ${err.message}`);
        }
    })

    // Retornar uma entrada da tabela item, por id
    app.get('/itens/:id', (req, res) => {
        const idNum = req.params.id;

        try {
            ItemDao.get(idNum, (err, item) => {
                if(err === null) {
                    return res.status(200).send(item);
                } else {
                    return res.status(404).send(`Erro: Not Found`);
                }
            })
        } catch (err) {
            return res.status(500).send(`Erro: ${err.message}`);
        }
    })

    // Adicionar uma entrada da tabela item
    app.post('/itens', (req, res) => {
        const newItem = req.body;

        if(newItem.nome === undefined || newItem.preco === undefined) {
            return res.status(400).send(`Os campos nome e preço são obrigatórios!`)
        } else {
            try {
                const item = new Item(newItem.nome, newItem.preco);

                if(item.nome === undefined || item.preco === undefined) {
                    return res.status(400).send(`Erro: dados de nome e/ou preço incorretos!`)
                }

                ItemDao.adicionar(item);
                return res.status(200).send(`Item cadastrado com sucesso:
                                              nome: ${item.nome},
                                                preço: ${middleware.centsToReal(item.preco)}`);
            } catch (err) {
                return res.status(500).send(`Erro: ${err.message}`)
            }
        }
    })

    // Modificar o nome ou preço de uma entrada da tabela item, por id
    app.put('/itens/:id', (req,res) => {
        const idItem = req.params.id;
        const newItem = req.body;

        if(newItem.nome === undefined || newItem.preco === undefined) {
            return res.status(400).send(`Os campos de nome e preço são obrigatórios!`);
        } else {
            try {
                ItemDao.get(idItem, (err, item_cadastrado) => {
                    if(item_cadastrado === null || err !== null) {
                        return res.status(400).send(`Erro: item não encontrado no cadastro!`);
                    }
                    //
                    const item = new Item(newItem.nome, newItem.preco);
                    if(item.nome === undefined || item.preco === undefined) {
                        return res.status(400).send(`Erro: dado de nome e/ou preço incorretos!`);
                    }

                    ItemDao.modificar(idItem, item);
                    return res.status(200).send(`Item modificado com sucesso:
                                                 nome do item: ${item.nome},
                                                 preço do item: ${middleware.centsToReal(item.preco)}`);
                })
            } catch (err) {
                return res.status(500).send(`Erro: ${err.message}`);
            }
        }

    })

    // Excluir uma entrada de item do cadastro, por id
    app.delete('/itens/:id', (req, res) => {
        const idNum = req.params.id;

        try {
            ItemDao.delete(idNum, (err, item) => {
                if(err === null) {
                    return res.status(200).send(`Item de id ${idNum} excluído com sucesso!`);
                } else {
                    return res.status(404).send(`Erro: Not Found`);
                }
            })
        } catch (err) {
            return res.status(500).send(`Erro: ${err.message}`);
        }
    })
}