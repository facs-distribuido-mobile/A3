const ItemDao = require('../dao/ItensDao');
const middleware = require('../middlewares/general');

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
        const newItem = req.body;

        if(!newItem.nome.trim() || Number(!newItem.preco.trim())) {
            res.status(400).send(`Os campos nome e preço são obrigatórios!`)
        } else if (middleware.verificaNegativo(middleware.realToCents(newItem.preco))) {
            res.status(400).send(`O campo preço não pode ser negativo!`)
        } else {
            try {
                ItemDao.adicionar(newItem);
                res.status(200).send(`Item cadastrado com sucesso:
                                        nome: ${newItem.nome.trim()},
                                        preço: ${newItem.preco.trim()}`);
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