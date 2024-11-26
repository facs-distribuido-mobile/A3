module.exports = class Itens {
    constructor(nome, preco, unidades) {
        if(nome.trim()) {
            this.nome = nome.trim();
        }

        if(preco > 0) {
            this.preco = Number(preco);
        }

        if(unidades > 0) {
            this.unidades = Number(unidades);
        }
    }
}