const ClientesDao = require('../dao/ClientesDao');
const Cliente = require('../models/Cliente');

module.exports = app => {
    app.get('/clientes', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        ClientesDao.getAll((err, clientes) => {
            if (err) {
                if (err === 'Not found') {
                    return res.status(404).send({ erro: 'Nenhum cliente encontrado.' });
                }
                console.log(`Erro: ${err}`);
                return res.status(500).send({ erro: 'Erro no servidor.' });
            }
            return res.status(200).send(clientes);
        });
    });

    app.get('/clientes/:id', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const idNum = req.params.id;
        
        ClientesDao.get(idNum, (err, cliente) => {
            if (err) {
                if (err === 'Not found') {
                    return res.status(404).send({ erro: `Cliente de id '${idNum}' não encontrado.` });
                }
                console.log(`Erro: ${err}`);
                return res.status(500).send({ erro: 'Erro no servidor.' });
            }
            return res.status(200).send(cliente);
        });
    });

    app.post('/clientes', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const requisicao = req.body;

        if (Object.keys(requisicao).length !== 3 || requisicao.nome === undefined || requisicao.cpf === undefined || requisicao.email === undefined) {
            return res.status(400).send({ erro: 'Esta requisição deve conter os campos nome, CPF e email apenas.' });
        }

        const cliente = new Cliente(requisicao.nome, requisicao.cpf, requisicao.email);
        if (cliente.nome === undefined) {
            return res.status(400).send({ erro: 'O valor do campo nome deve ser uma string não-vazia.' });
        }
        if (cliente.cpf === undefined) {
            return res.status(400).send({ erro: 'O valor do campo CPF deve conter uma string de um CPF válido, no formato \'XXXXXXXXXXX\' ou \'XXX.XXX.XXX-XX\'.' });
        }
        if (cliente.email === undefined) {
            return res.status(400).send({ erro: 'O valor do campo email deve conter uma string de um email válido. Exemplo: \'usuario_legal@dominio.com.br\'.' });
        }

        ClientesDao.add(cliente, (err, dbRes) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    if (err.message.includes('clientes.cpf')) {
                        return res.status(409).send({ erro: `O CPF '${cliente.cpf}' já está cadastrado e não pode ser repetido.` });
                    }
                    if (err.message.includes('clientes.email')) {
                        return res.status(409).send({ erro: `O email '${cliente.email}' já está cadastrado e não pode ser repetido.` });
                    }
                }
                console.log(`Erro: ${err}`);
                return res.status(500).send({ erro: 'Erro no servidor.' });
            }
            return res.status(201).send({ mensagem: 'Cliente cadastrado com sucesso!', cliente });
        });
    });

    app.put('/clientes/:id', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const idNum = req.params.id;
        const requisicao = req.body;

        if (Object.keys(requisicao).length !== 3 || requisicao.nome === undefined || requisicao.cpf === undefined || requisicao.email === undefined) {
            return res.status(400).send({ erro: 'Esta requisição deve conter os campos nome, CPF e email apenas.' });
        }

        const cliente = new Cliente(requisicao.nome, requisicao.cpf, requisicao.email);
        if (cliente.nome === undefined) {
            return res.status(400).send({ erro: 'O valor do campo nome deve ser uma string não-vazia.' });
        }
        if (cliente.cpf === undefined) {
            return res.status(400).send({ erro: 'O valor do campo CPF deve conter uma string de um CPF válido, no formato \'XXXXXXXXXXX\' ou \'XXX.XXX.XXX-XX\'.' });
        }
        if (cliente.email === undefined) {
            return res.status(400).send({ erro: 'O valor do campo email deve conter uma string de um email válido. Exemplo: \'usuario_legal@dominio.com.br\'.' });
        }

        ClientesDao.update(idNum, cliente, (err, dbRes) => {
            if (err) {
                if (err === 'Not found') {
                    return res.status(404).send({ erro: `Cliente de id '${idNum}' não encontrado.` });
                }
                if (err.code === 'ER_DUP_ENTRY') {
                    if (err.message.includes('clientes.cpf')) {
                        return res.status(409).send({ erro: `O CPF '${cliente.cpf}' já está cadastrado e não pode ser repetido.` });
                    }
                    if (err.message.includes('clientes.email')) {
                        return res.status(409).send({ erro: `O email '${cliente.email}' já está cadastrado e não pode ser repetido.` });
                    }
                }
                console.log(`Erro: ${err}`);
                return res.status(500).send({ erro: 'Erro no servidor.' });
            }
            return res.status(200).send({ mensagem: 'Cliente atualizado com sucesso!', id: idNum, cliente });
        });
    });

    app.patch('/clientes/:id', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const idNum = req.params.id;
        const requisicao = req.body;

        if (requisicao.nome === undefined && requisicao.cpf === undefined && requisicao.email === undefined) {
            return res.status(400).send({ erro: 'Esta requisição deve conter os campos nome, CPF ou email.' });
        }

        const cliente = new Cliente(requisicao.nome, requisicao.cpf, requisicao.email);
        if (requisicao.nome !== undefined && cliente.nome === undefined) {
            return res.status(400).send({ erro: 'O valor do campo nome deve ser uma string não-vazia.' });
        }
        if (requisicao.cpf !== undefined && cliente.cpf === undefined) {
            return res.status(400).send({ erro: 'O valor do campo CPF deve conter uma string de um CPF válido, no formato \'XXXXXXXXXXX\' ou \'XXX.XXX.XXX-XX\'.' });
        }
        if (requisicao.email !== undefined && cliente.email === undefined) {
            return res.status(400).send({ erro: 'O valor do campo email deve conter uma string de um email válido. Exemplo: \'usuario_legal@dominio.com.br\'.' });
        }

        ClientesDao.update(idNum, cliente, (err, dbRes) => {
            if (err) {
                if (err === 'Not found') {
                    return res.status(404).send({ erro: `Cliente de id '${idNum}' não encontrado.` });
                }
                if (err.code === 'ER_DUP_ENTRY') {
                    if (err.message.includes('clientes.cpf')) {
                        return res.status(409).send({ erro: `O CPF '${cliente.cpf}' já está cadastrado e não pode ser repetido.` });
                    }
                    if (err.message.includes('clientes.email')) {
                        return res.status(409).send({ erro: `O email '${cliente.email}' já está cadastrado e não pode ser repetido.` });
                    }
                }
                console.log(`Erro: ${err}`);
                return res.status(500).send({ erro: 'Erro no servidor.' });
            }
            return res.status(200).send({ mensagem: 'Cliente atualizado com sucesso!', id: idNum, cliente });
        });
    });

    app.delete('/clientes/:id', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const idNum = req.params.id;

        ClientesDao.delete(idNum, (err, dbRes) => {
            if (err) {
                if (err === 'Not found') {
                    return res.status(404).send({ erro: `Cliente de id '${idNum}' não encontrado.` });
                }
                console.log(`Erro: ${err}`);
                return res.status(500).send({ erro:'Erro no servidor.'  });
            }
            return res.status(200).send({ mensagem: `Cliente de id '${idNum}' excluído com sucesso!`});
        });
    });
}