const validarCpf = require('../middlewares/validarCpf')

module.exports = class Vendedor {
  constructor(nome, cpf) {
    if (nome && nome.trim()) {
      this.nome = nome.trim();
    } else {
      throw new Error('O campo "nome" é obrigatório.');
    }

    const cpfValido = validarCpf(cpf);
    if (cpfValido) {
      this.cpf = cpfValido;
    } else {
      throw new Error('CPF inválido.');
    }
  }

  static criar(dados) {
    const { nome, cpf } = dados;
    return new Vendedor(nome, cpf);
  }
};
