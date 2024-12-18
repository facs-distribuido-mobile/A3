
    function verificaPositivo(num){
        return Number(num) >= 0 ? true : false;
    }

    function verificaNegativo(num) {
        return Number(num) < 0 ? true : false;
    }

    function verificaZero(num) {
        return Number(num) === 0 ? true : false;
    }

    function realToCents(num) {
       let temp = num.replace(",", ".");
       return Number(temp * 100).toFixed();
    }

    function centsToReal(num) {
        let temp = Number((num/100).toFixed(2));
        let result = temp.toLocaleString('pt-BR');
        return result;
    }

    function decimalsToInt(doubleString) {
        let tempString =  doubleString.replace(",", ".");
        let intNum = Number(tempString).toFixed();
        return intNum;
    }

    module.exports = {
        verificaPositivo,
        verificaZero,
        verificaNegativo,
        realToCents,
        centsToReal,
        decimalsToInt
    }
