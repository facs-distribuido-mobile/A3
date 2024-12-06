const ItemEstoqueDao = require('../dao/ItemEstoqueDao');
const ItemDao = require('../dao/ItensDao');
const ItemEstoque = require('../models/ItemEstoque');

module.exports = app => {
    // Retornar todas as entradas de item da tabela estoque
    app.get('/estoque', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        try {
            ItemEstoqueDao.all((err, itens_estoque) => {
                if(err === null) {
                    return res.status(200).send(itens_estoque);
                } else {
                    return res.status(404).send({ erro: 'Nenhum estoque encontrado.' });
                }
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send({ erro: 'Erro no servidor.' });
        }
    });

    // Retornar uma entrada de item da tabela estoque, por id
    app.get('/estoque/:id', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const idNum = req.params.id;

        try {
            ItemEstoqueDao.get(idNum, (err, item_estoque) => {
                if(err === null) {
                    return res.status(200).send(item_estoque);
                } else {
                    return res.status(404).send({ erro: `Estoque de id '${idNum}' não encontrado.` });
                }
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send({ erro: 'Erro no servidor.' });
        }
    });

    // Adicionar uma entrada de item da tabela estoque
    app.post('/estoque', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const newItemEstoque = req.body;

        if(newItemEstoque.id_item === undefined || newItemEstoque.quantidade === undefined){
            return res.status(400).send({ erro: `Os campos id do Item e quantidade são obrigatórios!` });
        } else {
            try{
                const itemEstoque = new ItemEstoque(newItemEstoque.id_item, newItemEstoque.quantidade);

                if(itemEstoque.id_item === undefined || itemEstoque.quantidade === undefined) {
                    return res.status(400).send({ erro: `Dados de id do item e/ou quantidade incorretos!` });
                }

                ItemDao.get(itemEstoque.id_item, (err, resultado_item) => {
                    if(err === null || resultado_item !== null) {
                        ItemEstoqueDao.get(itemEstoque.id_item, (err, resultado_estoque) => {
                            if(err === null || resultado_estoque !== null) {
                                return res.status(409).send({ erro: `Item de id ${itemEstoque.id_item} já cadastrado no estoque!` });
                            } else {
                                ItemEstoqueDao.adicionar(itemEstoque);
                                return res.status(201).send({ mensagem: 'Item cadastrado no estoque com sucesso!', itemEstoque });
                            }
                        });
                    } else {
                        return res.status(409).send({ erro: `Item de id ${itemEstoque.id_item} não cadastrado no sistema!` });
                    }
                });
            } catch (err) {
                console.log(err);
                return res.status(500).send({ erro: 'Erro no servidor.' });
            }
        }
    });

    // Modificar a quantidade de uma entrada item da tabela estoque, por id
    app.put('/estoque/:id', (req,res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const idItemEstoque = req.params.id;
        const newItemEstoque = req.body;

        if (newItemEstoque.quantidade === undefined) {
            return res.status(400).send({ erro: `O campo de quantidade é obrigatório!` });
        } else if (newItemEstoque.id_item) {
            return res.status(400).send({ erro: `O campo id do item não pode ser alterado!` });
        }else {
            try {
                ItemEstoqueDao.get(idItemEstoque, (err, item_estoque) => {
                    if(item_estoque === null || err !== null) {
                        return res.status(404).send({ erro: `Item não encontrado em estoque!` });
                    }

                    const itemEstoque = new ItemEstoque(idItemEstoque, newItemEstoque.quantidade);
                    if(itemEstoque.id_item === undefined || itemEstoque.quantidade === undefined) {
                        return res.status(400).send({ erro: `Dado id do item e/ou de quantidade em estoque incorreto!` });
                    }

                    ItemEstoqueDao.modificar(idItemEstoque, itemEstoque);
                    return res.status(200).send({ mensagem: 'Estoque modificado com sucesso!', itemEstoque });
                });
            } catch (err) {
                console.log(err);
                return res.status(500).send({ erro: 'Erro no servidor.' });
            }
        }
    });

    // Excluir uma entrada de item da tabela estoque, por id
    app.delete('/estoque/:id', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const idNum = req.params.id;

        try {
            ItemEstoqueDao.delete(idNum, (err, item) => {
                if(err === null) {
                    return res.status(200).send({ mensagem: `Estoque de id '${idNum}' excluído com sucesso!`});
                } else {
                    return res.status(404).send({ erro: `Estoque de id '${idNum}' não encontrado.` });
                }
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send({ erro: 'Erro no servidor.' });
        }
    });
}