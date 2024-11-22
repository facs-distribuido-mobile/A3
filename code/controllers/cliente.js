const ClienteDao = require('../dao/ClienteDao');

module.exports = app => {
    app.get('/cliente', (req, res) => {
        ClienteDao.all((err, cliente) => {
            res.header("Access-Control-Allow-Origin", "*");
            if(err === null) {
                res.status(200).send(cliente);
            } else {
                res.status(404).send('Erro: Not Found');
            }
        });
    });

    app.get('/cliente/:id', (req, res) => {
        let idNum = req.params.id;

        ClienteDao.get(idNum, (err, cliente) => {
            if(err === null) {
                res.status(200).send(cliente);
            } else {
                res.status(404).send('Erro: Not Found');
            }
        });
    });

    app.post('/cliente', (req, res) => {
        const novoCliente = req.body;

        try {
            ClienteDao.adicionar(novoCliente);
            res.status(200).send(`Item cadastrado com sucesso:
                                    nome: ${novoCliente.nome},
                                    CPF: ${novoCliente.cpf},
                                    email: ${novoCliente.email}`);
        } catch (err) {
            res.status(500).send(`Erro: ${err.message}`);
        }

    });

    app.delete('/cliente/:id', (req, res) => {
        let idNum = req.params.id;

        ClienteDao.delete(idNum, (err, cliente) => {
            if(err === null) {
                res.status(200).send(`Cliente de id ${idNum} excluído com sucesso!`);
            } else {
                res.status(404).send('Erro: Not Found');
            }
        });
    });
}