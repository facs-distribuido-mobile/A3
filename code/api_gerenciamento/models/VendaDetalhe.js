const checarEntradaInteiro = require('../middlewares/checarEntradaInteiro');

module.exports = class VendaDetalhe {
    constructor(idItem, quantidade) {
        this.idItem = checarEntradaInteiro(idItem);
        this.quantidade = checarEntradaInteiro(quantidade);
    }
}