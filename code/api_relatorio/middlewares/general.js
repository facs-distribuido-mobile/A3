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

    module.exports = {
        centsToReal,
        decimalsToInt
    }
