const middleware = require('../middlewares/general');

module.exports = class Item {
    constructor(nome, preco) {
        const precoTransformado = Number(middleware.realToCents(preco));

        if(typeof (nome) === "string" && !nome.trim()) {
            this.nome = nome.trim();
        }

        if(Number(precoTransformado) && Number(precoTransformado) >= 0) {
            this.preco = Number(precoTransformado);
        }
    }

}