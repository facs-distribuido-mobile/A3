const VendasDao = require('../dao/VendasDao');
const VendasDetalhesDao = require('../dao/VendasDetalhesDao');
const Venda = require('../models/Venda');
const VendaDetalhe = require('../models/VendaDetalhe');

module.exports = app => {
    app.get('/vendas', async (req, res) => {
        let vendas;
        try {
            vendas = await VendasDao.getAll();
            if (vendas.length === 0) {
                return res.status(404).send('Erro: Nenhuma venda encontrada.');
            }
        } catch (error) {
            console.log(`Erro: ${error}`);
            return res.status(500).send('Erro: Erro no servidor.');
        }

        vendas = vendas.map(venda => {
            return Venda.conversoes(venda);
        });

        return res.status(200).send(vendas);
    });

    app.get('/vendas/:id', async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const idNum = req.params.id;

        let venda;
        try {
            venda = await VendasDao.get(idNum);
            if (venda === undefined) {
                return res.status(404).send(`Erro: Venda de id '${idNum}' não encontrada.`);
            }
        } catch (error) {
            console.log(`Erro: ${error}`);
            return res.status(500).send('Erro: Erro no servidor.');
        }

        venda = Venda.conversoes(venda);

        return res.status(200).send(venda);
    });

    app.post('/vendas', async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        const requisicao = req.body;

        if (Object.keys(requisicao).length !== 4 || requisicao.id_cliente === undefined || requisicao.id_vendedor === undefined || requisicao.status === undefined || requisicao.detalhes === undefined) {
            return res.status(400).send('Erro: Esta requisição deve conter os campos id_cliente, id_vendedor, status da venda, e detalhes da venda.');
        }

        const venda = new Venda(requisicao.id_cliente, requisicao.id_vendedor, requisicao.status, requisicao.detalhes);
        if (venda.idCliente === undefined) {
            return res.status(400).send('Erro: O valor do campo id_cliente deve conter um numero inteiro positivo.');
        }
        if (venda.idVendedor === undefined) {
            return res.status(400).send('Erro: O valor do campo id_vendedor deve conter um numero inteiro positivo.');
        }
        if (venda.status === undefined) {
            return res.status(400).send('Erro: O valor do campo status deve conter uma string de valor "cancelado", "pendente" ou "finalizado".');
        }
        if (requisicao.detalhes === undefined || !Array.isArray(requisicao.detalhes)) {
            return res.status(400).send('Erro: O valor do campo detalhes deve conter uma lista de objetos.');
        }

        const quantidadeAtual = [];
        for (const requisicaoDetalhe of requisicao.detalhes) {
            if (Object.keys(requisicaoDetalhe).length !== 2 || requisicaoDetalhe.id_item === undefined || requisicaoDetalhe.quantidade === undefined) {
                return res.status(400).send('Erro: Esta requisição deve conter os campos id_item e quantidade.');
            }

            const detalhe = new VendaDetalhe(requisicaoDetalhe.id_item, requisicaoDetalhe.quantidade);
            if (detalhe.idItem === undefined) {
                return res.status(400).send('Erro: O valor do campo id_item deve conter um numero inteiro positivo.');
            }
            if (detalhe.quantidade === undefined) {
                return res.status(400).send('Erro: O valor do campo quantidade deve conter um numero inteiro positivo.');
            }

            try {
                const dbDetalhe = await VendasDetalhesDao.getPrecoQuantidade(detalhe.idItem);
                if (dbDetalhe === undefined) {
                    return res.status(409).send(`Erro: Item de id '${detalhe.idItem}' não encontrado.`);
                }
                if (dbDetalhe.quantidade_atual < detalhe.quantidade) {
                    return res.status(409).send(`Erro: A quantidade ${detalhe.quantidade} requisitada para o item de id '${detalhe.idItem}' supera a quantidade atual do estoque: ${dbDetalhe.quantidade_atual}.`);
                }

                detalhe.preco = dbDetalhe.preco;
                venda.detalhes.push(detalhe);
                venda.total += detalhe.quantidade * detalhe.preco;
                quantidadeAtual.push(dbDetalhe.quantidade_atual);
            } catch (error) {
                console.log(`Erro: ${error}`);
                return res.status(500).send('Erro: Erro no servidor.');
            }
        }

        let idInsert;
        try {
            const dbVendasRes = await VendasDao.add(venda);
            idInsert = dbVendasRes.insertId;
        } catch (error) {
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                if (error.message.slice(-17, -9) === 'clientes') {
                    return res.status(409).send(`Erro: Cliente de id '${venda.idCliente}' não encontrado.`);
                }
                if (error.message.slice(-19, -9) === 'vendedores') {
                    return res.status(409).send(`Erro: Vendedor de id '${venda.idVendedor}' não encontrado.`);
                }
            }
            console.log(`Erro: ${error}`);
            return res.status(500).send('Erro: Erro no servidor.');
        }

        for (const detalhe of venda.detalhes) {
            try {
                const dbDetalhesRes = await VendasDetalhesDao.add(idInsert, detalhe);
            } catch (error) {
                console.log(`Erro: ${error}`);
                return res.status(500).send('Erro: Erro no servidor.');
            }
        }

        if (venda.status !== 'cancelado') {
            quantidadeAtual.reverse();
            for (const detalhe of venda.detalhes) {
                try {
                    const dbDetalhesRes = await VendasDetalhesDao.estoqueAfterAdd(detalhe, quantidadeAtual.pop());
                } catch (error) {
                    console.log(`Erro: ${error}`);
                    return res.status(500).send('Erro: Erro no servidor.');
                }
            }
        }
        
        return res.status(201).send({ mensagem: 'Venda cadastrada com sucesso!', venda });
    });

    app.delete('/vendas/:id', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
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