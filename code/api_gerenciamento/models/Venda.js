const checarEntradaString = require('../middlewares/checarEntradaString');
const { centsToReal }  = require('../middlewares/general');

module.exports = class Venda {
    constructor(clienteId, vendedorId, dataHora, status, total) {
        this.clienteId = clienteId;
        this.vendedorId = vendedorId;
        this.dataHora = dataHora;
        this.status = status;
        this.total = total;
    }

    static conversoes(venda) {
        venda['data_hora'] = venda['data_hora'].toLocaleString('pt-BR');
        venda['total'] = centsToReal(venda['total']);
        if (venda['detalhes']) {
            venda['detalhes'] = JSON.parse(venda['detalhes']);
            venda['detalhes'] = venda['detalhes'].map(detalhe => {
                detalhe['preco'] = centsToReal(detalhe['preco']);
                return detalhe;
            });
        }
        return venda;
    }
}