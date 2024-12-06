const middleware = require('../middlewares/general');

module.exports = class Item {
    nome;
    preco;

    constructor(nome, preco) {
        const precoTransformado = Number(middleware.realToCents(preco));
        const nomeTratado = nome.trim();

        if(nomeTratado
            && typeof nomeTratado === 'string') {
            this.nome = nome.trim();
        }

        if(precoTransformado
            && middleware.verificaPositivo(precoTransformado)) {
            this.preco = Number(precoTransformado);
        }
    }

}