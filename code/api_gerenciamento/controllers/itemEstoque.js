const dbConnection = require("../config/conexao");
const ItemEstoqueDao = require('../dao/ItemEstoqueDao');
const middleware = require('../middlewares/general');

module.exports = app => {
    // Retornar todas as entradas de item da tabela estoque
    app.get('/estoque', (req, res) => {

        try {
            ItemEstoqueDao.all((err, itens_estoque) => {
                res.header("Access-Control-Allow-Origin", "*");
                if(err === null) {
                    res.status(200).send(itens_estoque);
                } else {
                    res.status(404).send(`Not Found`);
                }
            })
        } catch (err) {
            res.status(500).send(`Erro: ${err.message}`);
        }
    })

    // Retornar uma entrada de item da tabela estoque, por id
    app.get('/estoque/:id', (req, res) => {
        const idNum = req.params.id;

        try {
                ItemEstoqueDao.get(idNum, (err, item_estoque) => {
                    if(err === null) {
                        res.status(200).send(item_estoque);
                    } else {
                        res.status(404).send(`Erro: Not Found`);
                    }
                })
        } catch (err) {
            res.status(500).send(`Erro: ${err.message}`);
        }
    })

    // Adicionar uma entrada de item da tabela estoque
    app.post('/estoque', (req, res) => {
        const newItemEstoque = req.body;

        if(Number(!newItemEstoque.id_item.trim()) || Number(!newItemEstoque.quantidade.trim())) {
            res.status(400).send(`Os campos de id do item e quantidade são obrigatórios!`);
        } else if (middleware.verificaNegativo(newItemEstoque.quantidade)) {
            res.status(400).send(`O campo quantidade não pode ser negativo!`);
        } else {
            try {
                ItemEstoqueDao.get(newItemEstoque.id_item, (err, item_estoque) => {
                    if(item_estoque !== null || err === null) {
                        res.status(400).send(`Erro: item já cadastrado no estoque!`);
                    }  else {
                        ItemEstoqueDao.adicionar(newItemEstoque);
                        res.status(200).send(`Item cadastrado no estoque com sucesso:
                                                id do item: ${newItemEstoque.id_item.trim()},
                                                quantidade: ${newItemEstoque.quantidade.trim()}`);
                    }
                });
            } catch (err) {
                res.status(500).send(`Erro: ${err.message}`);
            }
        }

    })

    // Modificar a quantidade de uma entrada item da tabela estoque, por id
    app.put('/estoque/:id', (req,res) => {
        const newItemEstoque = req.body;
        const idItemEstoque = req.params.id;

        if (middleware.verificaNegativo(newItemEstoque.quantidade)) {
            res.status(400).send(`Erro: quantidade do item não pode ser negativa`);
        } else {
            try {
                ItemEstoqueDao.get(idItemEstoque, (err, item_estoque) => {
                    if(item_estoque.length === 0 || err !== null) {
                        res.status(400).send(`Erro: item não encontrado em estoque!`)
                    } else {
                        ItemEstoqueDao.modificar(idItemEstoque, newItemEstoque.quantidade);
                        res.status(200).send(`Item modificado no estoque com sucesso:
                                       id do item: ${idItemEstoque},
                                       quantidade: ${newItemEstoque.quantidade}`);
                    }
                })
            } catch (err) {
                res.status(500).send(`Erro: ${err.message}`);
            }
        }
    })

    // Excluir uma entrada de item da tabela estoque, por id
    app.delete('/estoque/:id', (req, res) => {
        const idNum = req.params.id;

        ItemEstoqueDao.delete(idNum, (err, item) => {
            if(err === null) {
                res.status(200).send(`Item de id ${idNum} excluído com sucesso!`);
            } else {
                res.status(404).send(`Erro: Not Found`);
            }
        })
    })


}