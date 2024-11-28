const middleware = require('../middlewares/general');

module.exports = class ItemEstoque {
    id_item;
    quantidade;

    constructor(idItem, quantidade) {
        const idItemTratado = Number(idItem);
        const quantidadeTratada = Number(quantidade)

        if(idItemTratado
            && typeof (idItemTratado) === 'number') {
            this.id_item = idItemTratado;
        }

        if(quantidadeTratada
            && typeof (quantidadeTratada) === 'number'
            && middleware.verificaPositivo(quantidadeTratada)) {
            this.quantidade = quantidadeTratada;
        }
    }

}