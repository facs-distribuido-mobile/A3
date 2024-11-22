const vendedorDao = require('../dao/vendedorDao');
const Vendedor = require('../models/vendedor');

const vendedorController = {
    create: (req, res) => {
        const { nome, cpf } = req.body;

        // Validação do Nome e CPF
        if (!nome || !cpf) {
            return res.status(400).json({ message: 'Nome e CPF são obrigatórios.' });
        }

        // Validação do CPF
        const cpfRegex = /^\d{11}$/;
        if (!cpfRegex.test(cpf)) {
            return res.status(400).json({
                message: 'O CPF deve conter exatamente 11 dígitos e apenas números.'
            });
        }

        // Verificar se o CPF já existe
        vendedorDao.checkCpfExists(cpf, (err, results) => {
            if (err) {
                console.error('Erro ao verificar CPF:', err);
                return res.status(500).json({ message: 'Erro ao verificar CPF.' });
            }

            if (results.length > 0) {
                return res.status(409).json({ message: 'CPF já cadastrado.' });
            }

            // Inserir vendedor
            vendedorDao.create(nome, cpf, (err, result) => {
                if (err) {
                    console.error('Erro ao criar vendedor:', err);
                    return res.status(500).json({ message: 'Erro ao criar vendedor.' });
                }
                res.status(201).json({ message: 'Vendedor cadastrado com sucesso.', id: result.insertId });
            });
        });
    },

    // Listar todos os vendedores
    getAll: (req, res) => {
        vendedorDao.getAll((err, results) => {
            if (err) {
                console.error('Erro ao listar vendedores:', err);
                return res.status(500).json({ message: 'Erro ao listar vendedores.' });
            }
            res.status(200).json(results);
        });
    },

    // Obter vendedor por ID
    getById: (req, res) => {
        const { id } = req.params;

        vendedorDao.getById(id, (err, results) => {
            if (err) {
                console.error('Erro ao buscar vendedor:', err);
                return res.status(500).json({ message: 'Erro ao buscar vendedor.' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'Vendedor não encontrado.' });
            }

            res.status(200).json(results[0]);
        });
    },

    // Atualizar vendedor
    update: (req, res) => {
        const { id } = req.params;
        const { nome, cpf } = req.body;

        if (!nome || !cpf) {
            return res.status(400).json({ message: 'Nome e CPF são obrigatórios.' });
        }

        const cpfRegex = /^\d{11}$/;
        if (!cpfRegex.test(cpf)) {
            return res.status(400).json({
                message: 'O CPF deve conter exatamente 11 dígitos e apenas números.'
            });
        }

        vendedorDao.update(id, nome, cpf, (err) => {
            if (err) {
                console.error('Erro ao atualizar vendedor:', err);
                return res.status(500).json({ message: 'Erro ao atualizar vendedor.' });
            }
            res.status(200).json({ message: 'Vendedor atualizado com sucesso.' });
        });
    },

    // Deletar vendedor
    delete: (req, res) => {
        const { id } = req.params;

        vendedorDao.delete(id, (err) => {
            if (err) {
                console.error('Erro ao excluir vendedor:', err);
                return res.status(500).json({ message: 'Erro ao excluir vendedor.' });
            }
            res.status(200).json({ message: 'Vendedor excluído com sucesso.' });
        });
    }
};

module.exports = vendedorController;