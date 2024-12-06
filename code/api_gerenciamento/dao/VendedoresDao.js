const db = require('../config/conexao');

class VendedoresDao {
  total(callback) {
    const query = 'SELECT COUNT(*) as total FROM vendedores';
    db.createConnection().query(query, [], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result[0].total);
    });
  }

  all(callback) {
    const query = 'SELECT * FROM vendedores';
    db.createConnection().query(query, [], (err, vendedores) => {
      if (err) return callback(err, null);
      callback(null, vendedores);
    });
  }

  getById(id, callback) {
    const query = 'SELECT * FROM vendedores WHERE id = ?';
    db.createConnection().query(query, [id], (err, vendedores) => {
      if (err || !vendedores.length) return callback(new Error('Vendedor não encontrado.'), null);
      callback(null, vendedores[0]);
    });
  }

  add(vendedor, callback) {
    const query = 'INSERT INTO vendedores (nome, cpf) VALUES (?, ?)';
    db.createConnection().query(query, [vendedor.nome, vendedor.cpf], callback);
  }

  update(id, vendedor, callback) {
    const query = 'UPDATE vendedores SET nome = ?, cpf = ? WHERE id = ?';
    db.createConnection().query(query, [vendedor.nome, vendedor.cpf, id], callback);
  }

  delete(id, callback) {
    const query = 'DELETE FROM vendedores WHERE id = ?';
    db.createConnection().query(query, [id], callback);
  }
}

module.exports = new VendedoresDao();
