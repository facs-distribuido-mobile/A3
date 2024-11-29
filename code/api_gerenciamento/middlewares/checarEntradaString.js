function checarEntradaString(entrada) {
    return typeof entrada === "string" && entrada.trim();
}

module.exports = checarEntradaString;