module.exports = class Cliente {
    constructor(nome, cpf, email) {
        if (this.#checarEntradaString(nome)) {
            const nomeFiltrado = nome.trim();
            this.nome = nomeFiltrado;
        }

        if (this.#checarEntradaString(cpf)) {
            let cpfFiltrado = cpf.trim();
            const padrao = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/gm;
            if (padrao.test(cpfFiltrado)) {
                cpfFiltrado = cpfFiltrado.replace(/[\.\-]/gm, '');
                let verificador = 0;
                for (let i = 0; i < cpfFiltrado.length - 2; i++) {
                    verificador += (10 - i) * Number(cpfFiltrado[i]);
                }
                verificador %= 11;
                verificador = (verificador < 2) ? 0 : (11 - verificador);
                if (Number(cpfFiltrado[9]) === verificador) {
                    verificador = 0;
                    for (let i = 0; i < cpfFiltrado.length - 1; i++) {
                        verificador += (11 - i) * Number(cpfFiltrado[i]);
                    }
                    verificador %= 11;
                    verificador = (verificador < 2) ? 0 : (11 - verificador);
                    if (Number(cpfFiltrado[10]) === verificador) {
                        this.cpf = cpfFiltrado;
                    }
                }
            }
        }

        if (this.#checarEntradaString(email)) {
            const emailFiltrado = email.trim();
            const padrao = /^[a-zA-Z0-9](?:(?:[a-zA-Z0-9]?(?![._+-]{2,})[._+-])*[a-zA-Z0-9])*@[a-zA-Z0-9](?:(?:[a-zA-Z0-9]?(?!\-{2,})\-)*[a-zA-Z0-9])*(?:\.[a-zA-Z]{2,})+$/gm;
            if (padrao.test(emailFiltrado)) {
                this.email = emailFiltrado;
            }
        }
    }

    #checarEntradaString(entrada) {
        return typeof entrada === "string" && entrada.trim();
    }
}