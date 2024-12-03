const checarEntradaString = require('../middlewares/checarEntradaString');
const validarCpf = require = require('../middlewares/validarCpf');

module.exports = class Cliente {
    constructor(nome, cpf, email) {
        if (checarEntradaString(nome)) {
            const nomeFiltrado = nome.trim();
            this.nome = nomeFiltrado;
        }

        if (checarEntradaString(cpf)) {
            this.cpf = validarCpf(cpf.trim());
        }

        if (checarEntradaString(email)) {
            const emailFiltrado = email.trim();
            const padrao = /^[a-zA-Z0-9](?:(?:[a-zA-Z0-9]?(?![._+-]{2,})[._+-])*[a-zA-Z0-9])*@[a-zA-Z0-9](?:(?:[a-zA-Z0-9]?(?!\-{2,})\-)*[a-zA-Z0-9])*(?:\.[a-zA-Z]{2,})+$/gm;
            if (padrao.test(emailFiltrado)) {
                this.email = emailFiltrado;
            }
        }
    }
}