const middlewares = require('../middlewares/general');

module.exports = class ProdutosRelatorio {
    id_item;
    nome_item;
    preco_item;
    quantidade_total;

    constructor(id, nome, preco, quantidade) {
        if(!isNaN(Number(id))) {
            this.id_item = Number(id);
        }

        if(middlewares.checarEntradaString(nome)) {
            const nomeTratado = nome.trim();
            this.nome_item = nomeTratado;
        }

        if(!isNaN(Number(preco))) {
            this.preco_item = Number(preco);
        }

        if(!isNaN(Number(quantidade))) {
            this.quantidade_total = Number(quantidade);
        }
    }

}