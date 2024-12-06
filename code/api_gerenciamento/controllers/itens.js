const middleware = require('../middlewares/general');
const ItemDao = require('../dao/ItensDao');
const Item = require('../models/Item');

module.exports = app => {
    // Retornar todas as entradas da tabela itens
    app.get('/itens', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        try {
            ItemDao.all((err, itens) => {
                if(err === null) {
                    return res.status(200).send(itens);
                } else {
                    return res.status(404).send({ erro: 'Nenhum item encontrado.' });
                }
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send({ erro: 'Erro no servidor.' });
        }
    });

    // Retornar uma entrada da tabela item, por id
    app.get('/itens/:id', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const idNum = req.params.id;

        try {
            ItemDao.get(idNum, (err, item) => {
                if(err === null) {
                    return res.status(200).send(item);
                } else {
                    return res.status(404).send({ erro: `Item de id '${idNum}' não encontrado.` });
                }
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send({ erro: 'Erro no servidor.' });
        }
    });

    // Adicionar uma entrada da tabela item
    app.post('/itens', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const newItem = req.body;

        if(newItem.nome === undefined || newItem.preco === undefined) {
            return res.status(400).send({ erro: `Os campos nome e preço são obrigatórios!` });
        } else {
            try {
                const item = new Item(newItem.nome, newItem.preco);

                if(item.nome === undefined || item.preco === undefined) {
                    return res.status(400).send({ erro: `Dados de nome e/ou preço incorretos!` });
                }

                ItemDao.adicionar(item);
                return res.status(201).send({ mensagem: 'Item cadastrado com sucesso!', item });
            } catch (err) {
                console.log(err);
                return res.status(500).send({ erro: 'Erro no servidor.' });
            }
        }
    });

    // Modificar o nome ou preço de uma entrada da tabela item, por id
    app.put('/itens/:id', (req,res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const idItem = req.params.id;
        const newItem = req.body;

        if(newItem.nome === undefined || newItem.preco === undefined) {
            return res.status(400).send({ erro: `Os campos nome e preço são obrigatórios!` });
        } else {
            try {
                ItemDao.get(idItem, (err, item_cadastrado) => {
                    if(item_cadastrado === null || err !== null) {
                        return res.status(404).send({ erro: `Item não encontrado no cadastro!` });
                    }
                    //
                    const item = new Item(newItem.nome, newItem.preco);
                    if(item.nome === undefined || item.preco === undefined) {
                        return res.status(400).send({ erro: `Dados de nome e/ou preço incorretos!` });
                    }

                    ItemDao.modificar(idItem, item);
                    return res.status(200).send({ mensagem: 'Item modificado com sucesso!', item });
                });
            } catch (err) {
                console.log(err);
                return res.status(500).send({ erro: 'Erro no servidor.' });
            }
        }

    });

    // Excluir uma entrada de item do cadastro, por id
    app.delete('/itens/:id', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const idNum = req.params.id;

        try {
            ItemDao.delete(idNum, (err, item) => {
                if(err === null) {
                    return res.status(200).send({ mensagem: `Item de id '${idNum}' excluído com sucesso!`});
                } else {
                    return res.status(404).send({ erro: `Item de id '${idNum}' não encontrado.` });
                }
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send({ erro: 'Erro no servidor.' });
        }
    });
}