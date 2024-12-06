const validarCpf = require('../middlewares/validarCpf');
const checarEntradaString = require('../middlewares/checarEntradaString');

module.exports = class Vendedor {
  constructor(nome, cpf) {
    if (nome && nome.trim()) {
      this.nome = nome.trim();
    } else {
      throw new Error('O campo "nome" é obrigatório.');
    }

    if (checarEntradaString(cpf)) {
      const cpfValido = validarCpf(cpf);
      if (cpfValido) {
        this.cpf = cpfValido;
      }
    }

    if (!this.cpf) {
      throw new Error('O valor do campo CPF deve conter uma string de um CPF válido, no formato \'XXXXXXXXXXX\' ou \'XXX.XXX.XXX-XX\'.');
    }
  }

  static criar(dados) {
    const { nome, cpf } = dados;
    return new Vendedor(nome, cpf);
  }
};
