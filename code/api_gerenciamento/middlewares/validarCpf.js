function validarCpf(cpf) {
    const padrao = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/gm;
    if (padrao.test(cpf)) {
        cpf = cpf.replace(/[\.\-]/gm, '');
        let verificador = 0;
        for (let i = 0; i < cpf.length - 2; i++) {
            verificador += (10 - i) * Number(cpf[i]);
        }
        verificador %= 11;
        verificador = (verificador < 2) ? 0 : (11 - verificador);
        if (Number(cpf[9]) === verificador) {
            verificador = 0;
            for (let i = 0; i < cpf.length - 1; i++) {
                verificador += (11 - i) * Number(cpf[i]);
            }
            verificador %= 11;
            verificador = (verificador < 2) ? 0 : (11 - verificador);
            if (Number(cpf[10]) === verificador) {
                return cpf;
            }
        }
    }
}

module.exports = validarCpf;