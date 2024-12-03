    function centsToReal(num) {
        let temp = Number((num/100).toFixed(2));
        let result = temp.toLocaleString();
        return result;
    }

    function decimalsToInt(doubleString) {
        let tempString =  doubleString.replace(",", ".");
        let intNum = Number(tempString).toFixed();
        return intNum;
    }

    function checarEntradaString(entrada) {
        return typeof entrada === "string" && entrada.trim();
    }

    module.exports = {
        centsToReal,
        decimalsToInt,
        checarEntradaString
    }
