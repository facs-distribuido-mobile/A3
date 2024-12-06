const VendedoresDao = require('../dao/VendedoresDao');
const Vendedor = require('../models/Vendedor');
const validarCpf = require('../middlewares/validarCpf');

module.exports = (app) => {
  const verificarCpfDuplicado = (cpf, callback) => {
    VendedoresDao.all((err, vendedores) => {
      if (err) return callback(err, null);

      const cpfExiste = vendedores.some((vendedor) => vendedor.cpf === cpf);
      callback(null, cpfExiste);
    });
  };

  app.get('/vendedores', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    VendedoresDao.all((err, vendedores) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ erro: 'Erro no servidor.' });
      }
      res.status(200).send(vendedores);
    });
  });

  app.get('/vendedores/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { id } = req.params;
    VendedoresDao.getById(id, (err, vendedor) => {
      if (err) {
        if (err.message === 'Vendedor não encontrado.') {
          return res.status(404).send({ erro: err.message });
        }
        console.log(err);
        return res.status(500).send({ erro: 'Erro no servidor.' });
      }
      res.status(200).send(vendedor);
    });
  });

  app.post('/vendedores', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
      const vendedor = Vendedor.criar(req.body);

      verificarCpfDuplicado(vendedor.cpf, (err, cpfExiste) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ erro: 'Erro no servidor.' });
        }
        if (cpfExiste) return res.status(409).send({ erro: 'CPF já cadastrado.' });

        VendedoresDao.add(vendedor, (err) => {
          if (err){
            console.log(err);
            return res.status(500).send({ erro: 'Erro no servidor.' });
          }
          res.status(201).send({ mensagem: 'Vendedor cadastrado com sucesso!', vendedor });
        });
      });
    } catch (err) {
      if (err.message === 'O campo "nome" é obrigatório.' || err.message === 'O valor do campo CPF deve conter uma string de um CPF válido, no formato \'XXXXXXXXXXX\' ou \'XXX.XXX.XXX-XX\'.') {
        return res.status(400).send({ erro: err.message });
      }
      console.log(err);
      res.status(500).send({ erro: 'Erro no servidor.' });
    }
  });

  app.put('/vendedores/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {

      const vendedor = Vendedor.criar(req.body);
      const { id } = req.params;

      VendedoresDao.getById(id, (err, vendedorExistente) => {
        if (err) return res.status(404).send({ erro: 'Vendedor não encontrado.' });

        verificarCpfDuplicado(vendedor.cpf, (err, cpfExiste) => {
          if (err) {
            console.log(err);
            return res.status(500).send({ erro: 'Erro no servidor.' });
          }
          if (cpfExiste && vendedorExistente.cpf !== vendedor.cpf) {
            return res.status(409).send({ erro: 'CPF já cadastrado para outro vendedor.' });
          }

          VendedoresDao.update(id, vendedor, (err) => {
            if (err) {
              console.log(err);
              return res.status(500).send({ erro: 'Erro no servidor.' });
            }
            res.status(200).send({ mensagem: 'Vendedor atualizado com sucesso!' });
          });
        });
      });
    } catch (err) {
      if (err.message === 'O campo "nome" é obrigatório.' || err.message === 'O valor do campo CPF deve conter uma string de um CPF válido, no formato \'XXXXXXXXXXX\' ou \'XXX.XXX.XXX-XX\'.') {
        return res.status(400).send({ erro: err.message });
      }
      console.log(err);
      res.status(500).send({ erro: 'Erro no servidor.' });
    }
  });

  app.delete('/vendedores/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
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