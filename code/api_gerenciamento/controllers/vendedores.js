const VendedoresDao = require('../dao/vendedoresDao');
const Vendedor = require('../models/Vendedor');

module.exports = (app) => {
  const verificarCpfDuplicado = (cpf, callback) => {
    VendedoresDao.all((err, vendedores) => {
      if (err) return callback(err, null);

      const cpfExiste = vendedores.some((vendedor) => vendedor.cpf === cpf);
      callback(null, cpfExiste);
    });
  };

  app.get('/vendedores', (req, res) => {
    VendedoresDao.all((err, vendedores) => {
      if (err) return res.status(500).send({ erro: err.message });
      res.status(200).send(vendedores);
    });
  });

  app.get('/vendedores/:id', (req, res) => {
    const { id } = req.params;
    VendedoresDao.getById(id, (err, vendedor) => {
      if (err) return res.status(404).send({ erro: err.message });
      res.status(200).send(vendedor);
    });
  });

  app.post('/vendedores', (req, res) => {
    try {
      const vendedor = Vendedor.criar(req.body);

      verificarCpfDuplicado(vendedor.cpf, (err, cpfExiste) => {
        if (err) return res.status(500).send({ erro: err.message });
        if (cpfExiste) return res.status(400).send({ erro: 'CPF já cadastrado.' });

        VendedoresDao.add(vendedor, (err) => {
          if (err) return res.status(500).send({ erro: err.message });
          res.status(201).send({ mensagem: 'Vendedor cadastrado com sucesso!', vendedor });
        });
      });
    } catch (err) {
      res.status(400).send({ erro: err.message });
    }
  });

  app.put('/vendedores/:id', (req, res) => {
    try {
      const vendedor = Vendedor.criar(req.body);
      const { id } = req.params;

      VendedoresDao.getById(id, (err, vendedorExistente) => {
        if (err) return res.status(404).send({ erro: 'Vendedor não encontrado.' });

        verificarCpfDuplicado(vendedor.cpf, (err, cpfExiste) => {
          if (err) return res.status(500).send({ erro: err.message });

          // Permitir atualização caso o CPF seja o mesmo do vendedor atual
          if (cpfExiste && vendedorExistente.cpf !== vendedor.cpf) {
            return res.status(400).send({ erro: 'CPF já cadastrado para outro vendedor.' });
          }

          VendedoresDao.update(id, vendedor, (err) => {
            if (err) return res.status(500).send({ erro: err.message });
            res.status(200).send({ mensagem: 'Vendedor atualizado com sucesso!' });
          });
        });
      });
    } catch (err) {
      res.status(400).send({ erro: err.message });
    }
  });

  app.delete('/vendedores/:id', (req, res) => {
    const { id } = req.params;

    VendedoresDao.getById(id, (err, vendedorExistente) => {
      if (err) return res.status(404).send({ erro: 'Vendedor não encontrado.' });

      VendedoresDao.delete(id, (err) => {
        if (err) return res.status(500).send({ erro: err.message });
        res.status(200).send({ mensagem: `Vendedor de ID ${id} deletado com sucesso!` });
      });
    });
  });
};