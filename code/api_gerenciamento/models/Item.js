module.exports = class Item {
    constructor(nome, preco) {
        if(nome.trim()) {
            this.nome = nome.trim();
        }

        if(preco > 0) {
            this.preco = Number(preco);
        }
    }
}