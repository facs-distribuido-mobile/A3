module.exports = class Vendedor {
  constructor(nome, cpf) {
    if (nome && nome.trim()) {
      this.nome = nome.trim();
    } else {
      throw new Error('O campo "nome" é obrigatório.');
    }

    const cpfRegex = /^\d{11}$/;
    if (cpfRegex.test(cpf)) {
      this.cpf = cpf;
    } else {
      throw new Error('O CPF deve ter exatamente 11 dígitos numéricos.');
    }
  }

  static criar(dados) {
    const { nome, cpf } = dados;
    return new Vendedor(nome, cpf);
  }
};
