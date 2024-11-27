module.exports = class ItemEstoque {
    id_item;
    quantidade;

    constructor(id_item, quantidade) {
        if(Number(id_item.trim()) !== null) {
            this.id_item = Number(id_item).toFixed();
        }

        if(quantidade > 0) {
            this.quantidade = Number(quantidade);
        }
    }
}