const middleware = require('../middlewares/general');
const ItemEstoqueDao = require('../dao/ItemEstoqueDao');
const ItemEstoque = require('../models/ItemEstoque');

module.exports = app => {
    // Retornar todas as entradas de item da tabela estoque
    app.get('/estoque', (req, res) => {
        try {
            ItemEstoqueDao.all((err, itens_estoque) => {
                res.header("Access-Control-Allow-Origin", "*");
                if(err === null) {
                    return res.status(200).send(itens_estoque);
                } else {
                    return res.status(404).send(`Not Found`);
                }
            })
        } catch (err) {
            return res.status(500).send(`Erro: ${err.message}`);
        }
    })

    // Retornar uma entrada de item da tabela estoque, por id
    app.get('/estoque/:id', (req, res) => {
        const idNum = req.params.id;

        try {
                ItemEstoqueDao.get(idNum, (err, item_estoque) => {
                    if(err === null) {
                        return res.status(200).send(item_estoque);
                    } else {
                        return res.status(404).send(`Erro: Not Found`);
                    }
                })
        } catch (err) {
            res.status(500).send(`Erro: ${err.message}`);
        }
    })

    // Adicionar uma entrada de item da tabela estoque
    app.post('/estoque', (req, res) => {
        const newItemEstoque = req.body;

        if(newItemEstoque.id_item === undefined || newItemEstoque.quantidade === undefined){
            res.status(400).send(`Os campos id do Item e quantidade são obrigatórios!`)
        } else {
            try{
                const itemEstoque = new ItemEstoque(newItemEstoque.id_item, newItemEstoque.quantidade);

                if(itemEstoque.id_item === undefined || itemEstoque.quantidade === undefined) {
                    return res.status(400).send(`Erro: dados de id do item e/ou quantidade incorretos!`);
                }

                ItemEstoqueDao.get(itemEstoque.id_item, (err, itens_estoque) => {
                    if(itens_estoque !== null || err === null) {
                        return res.status(400).send(`Erro: item já cadastrado no estoque!`);
                    }  else {
                        ItemEstoqueDao.adicionar(itemEstoque);
                        return res.status(200).send(`Item cadastrado no estoque com sucesso:
                                                id do item: ${itemEstoque.id_item},
                                                quantidade: ${itemEstoque.quantidade}`);
                    }
                })
            } catch (err) {
                return res.status(500).send(`Erro: ${err.message}`);
            }
        }
    })

    // Modificar a quantidade de uma entrada item da tabela estoque, por id
    app.put('/estoque/:id', (req,res) => {
        const idItemEstoque = req.params.id;
        const newItemEstoque = req.body;

        if (newItemEstoque.quantidade === undefined) {
            return res.status(400).send(`O campo de quantidade é obrigatório!`);
        } else if (newItemEstoque.id_item) {
            return res.status(400).send(`O campo id do item não pode ser alterado!`);
        }else {
            try {
                ItemEstoqueDao.get(idItemEstoque, (err, item_estoque) => {
                    if(item_estoque.length === 0 || err !== null) {
                        return res.status(400).send(`Erro: item não encontrado em estoque!`)
                    }

                    const itemEstoque = new ItemEstoque(idItemEstoque, newItemEstoque.quantidade);
                    if(itemEstoque.id_item === undefined || itemEstoque.quantidade === undefined) {
                        return res.status(400).send(`Erro: dado id do item e/ou de quantidade em estoque incorreto!`);
                    }

                    ItemEstoqueDao.modificar(idItemEstoque, itemEstoque);
                    return res.status(200).send(`Item modificado no estoque com sucesso:
                                                 id do item: ${idItemEstoque},
                                                 quantidade: ${itemEstoque.quantidade}`);
                })
            } catch (err) {
                res.status(500).send(`Erro: ${err.message}`);
            }
        }
    })

    // Excluir uma entrada de item da tabela estoque, por id
    app.delete('/estoque/:id', (req, res) => {
        const idNum = req.params.id;

        try {
            ItemEstoqueDao.delete(idNum, (err, item) => {
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