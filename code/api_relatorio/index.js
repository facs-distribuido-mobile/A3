const express = require('express');
const consign = require('consign');

const app = express();
app.use(express.json());
const portNum = 3000;

consign()
        .include('./controllers')
        .into(app);

app.listen(portNum, () => {
    console.log(`Servidor backend de relatório rodando na porta ${portNum}`);
});

app.get('/', (req, res) => {
   res.status(200).send(`Servidor de relatórios rodando!`);
});