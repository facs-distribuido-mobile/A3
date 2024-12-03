const checarEntradaString = require('../middlewares/checarEntradaString');
const checarEntradaInteiro = require('../middlewares/checarEntradaInteiro');
const dataHoraAtualFormatado = require('../middlewares/dataHoraAtualFormatado');
const { centsToReal }  = require('../middlewares/general');

module.exports = class Venda {
    constructor(idCliente, idVendedor, status, detalhes) {
        this.idCliente = checarEntradaInteiro(idCliente);
        this.idVendedor = checarEntradaInteiro(idVendedor);
        if (checarEntradaString(status)) {
            const statusFiltrado = status.trim();
            if (['cancelado', 'pendente', 'finalizado'].includes(statusFiltrado)) {
                this.status = statusFiltrado;
            }
        }
        if (Array.isArray(detalhes)) {
            this.detalhes = detalhes;
        }
        this.dataHora = dataHoraAtualFormatado();
        this.detalhes = [];
        this.total = 0;
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