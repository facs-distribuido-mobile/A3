function checarEntradaInteiro(entrada) {
    if (typeof entrada === "string" && entrada.trim()) {
        entrada = Number(entrada.trim());
    }
    if (typeof entrada === "number" && Number.isInteger(entrada) && entrada > 0) {
        return entrada;
    }
}

module.exports = checarEntradaInteiro;