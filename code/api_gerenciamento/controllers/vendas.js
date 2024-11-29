const VendasDao = require('../dao/VendasDao');
const Venda = require('../models/Venda');

module.exports = app => {
    app.get('/vendas', (req, res) => {
        VendasDao.getAll((err, vendas) => {
            res.header("Access-Control-Allow-Origin", "*");
            if (err) {
                if (err === 'Not found') {
                    return res.status(404).send('Erro: Nenhuma venda encontrada.');
                }
                console.log(`Erro: ${err}`);
                return res.status(500).send('Erro: Erro no servidor.');
            }
            vendas = vendas.map(venda => {
                return Venda.conversoes(venda);
            });
            return res.status(200).send(vendas);
        });
    });

    app.get('/vendas/:id', (req, res) => {
        const idNum = req.params.id;
        
        VendasDao.get(idNum, (err, venda) => {
            if (err) {
                if (err === 'Not found') {
                    return res.status(404).send(`Erro: Venda de id '${idNum}' não encontrada.`);
                }
                console.log(`Erro: ${err}`);
                return res.status(500).send('Erro: Erro no servidor.');
            }
            venda = Venda.conversoes(venda);
            return res.status(200).send(venda);
        });
    });

    /*app.post('/vendas', (req, res) => {
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

        VendasDao.add(cliente, (err, dbRes) => {
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
            const mensagem = `Cliente cadastrado com sucesso:\nnome: ${cliente.nome},\nCPF: ${cliente.cpf},\nemail: ${cliente.email}`;
            return res.status(200).send(mensagem);
        });
    });*/

    app.delete('/vendas/:id', (req, res) => {
        const idNum = req.params.id;

        VendasDao.delete(idNum, (err, dbRes) => {
            if (err) {
                if (err === 'Not found') {
                    return res.status(404).send(`Erro: Venda de id '${idNum}' não encontrada.`);
                }
                console.log(`Erro: ${err}`);
                return res.status(500).send('Erro: Erro no servidor.');
            }
            return res.status(200).send(`Venda de id '${idNum}' excluída com sucesso!`);
        });
    });
}