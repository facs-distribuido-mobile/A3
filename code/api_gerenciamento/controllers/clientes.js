const ClientesDao = require('../dao/ClientesDao');
const Cliente = require('../models/Cliente');

module.exports = app => {
    app.get('/clientes', (req, res) => {
        ClientesDao.getAll((err, clientes) => {
            res.header("Access-Control-Allow-Origin", "*");
            if (err) {
                if (err === 'Not found') {
                    return res.status(404).send('Erro: Nenhum cliente encontrado.');
                }
                console.log(`Erro: ${err}`);
                return res.status(500).send('Erro: Erro no servidor.');
            }
            return res.status(200).send(clientes);
        });
    });

    app.get('/clientes/:id', (req, res) => {
        const idNum = req.params.id;
        
        ClientesDao.get(idNum, (err, cliente) => {
            if (err) {
                if (err === 'Not found') {
                    return res.status(404).send(`Erro: Cliente de id '${idNum}' não encontrado.`);
                }
                console.log(`Erro: ${err}`);
                return res.status(500).send('Erro: Erro no servidor.');
            }
            return res.status(200).send(cliente);
        });
    });

    app.post('/clientes', (req, res) => {
        const requisicao = req.body;

        if (Object.keys(requisicao).length !== 3 || requisicao.nome === undefined || requisicao.cpf === undefined || requisicao.email === undefined) {
            return res.status(400).send('Erro: Esta requisição deve conter os campos nome, CPF e email apenas.');
        }

        const cliente = new Cliente(requisicao.nome, requisicao.cpf, requisicao.email);
        if (cliente.nome === undefined) {
            return res.status(400).send('Erro: O valor do campo nome deve ser uma string não-vazia.');
        }
        if (cliente.cpf === undefined) {
            return res.status(400).send('Erro: O valor do campo CPF deve conter uma string de um CPF válido, no formato "XXXXXXXXXXX" ou "XXX.XXX.XXX-XX".');
        }
        if (cliente.email === undefined) {
            return res.status(400).send('Erro: O valor do campo email deve conter uma string de um email válido. Exemplo: "usuario_legal@dominio.com.br".');
        }

        ClientesDao.adicionar(cliente, (err, dbRes) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    if (err.sqlMessage.slice(-4, -1) === 'cpf') {
                        return res.status(409).send(`Erro: O CPF '${cliente.cpf}' já está cadastrado e não pode ser repetido.`);
                    }
                    if (err.sqlMessage.slice(-6, -1) === 'email') {
                        return res.status(409).send(`Erro: O email '${cliente.email}' já está cadastrado e não pode ser repetido.`);
                    }
                }
                console.log(`Erro: ${err}`);
                return res.status(500).send('Erro: Erro no servidor.');
            }
            return res.status(200).send(`Cliente cadastrado com sucesso:
                nome: ${cliente.nome},
                CPF: ${cliente.cpf},
                email: ${cliente.email}`);
        });
    });

    app.delete('/clientes/:id', (req, res) => {
        const idNum = req.params.id;

        ClientesDao.delete(idNum, (err, dbRes) => {
            if (err) {
                if (err === 'Not found') {
                    return res.status(404).send(`Erro: Cliente de id '${idNum}' não encontrado.`);
                }
                console.log(`Erro: ${err}`);
                return res.status(500).send('Erro: Erro no servidor.');
            }
            return res.status(200).send(`Cliente de id '${idNum}' excluído com sucesso!`);
        });
    });
}