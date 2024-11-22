const express = require('express');
const bodyParser = require('body-parser');
const vendedorController = require('./controllers/vendedorController');

const app = express();
app.use(bodyParser.json());

// Rotas do CRUD
app.post('/vendedor', vendedorController.create);
app.get('/vendedores', vendedorController.getAll);
app.get('/vendedor/:id', vendedorController.getById);
app.put('/vendedor/:id', vendedorController.update);
app.delete('/vendedor/:id', vendedorController.delete);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
