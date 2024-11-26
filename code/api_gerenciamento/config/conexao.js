const mySql = require('mysql');
require('dotenv').config();

class DbConnection {

    createConnection(){
        return mySql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_ROOT,
            password: process.env.MYSQL_ROOT_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            port: process.env.MYSQL_PORT
        });
    }
}

new DbConnection().createConnection().connect((err) => {
    if(err) {
        console.error(`Erro ao conectar o banco de dados`, err);
        throw err;
    }
    console.log(`Conectado ao banco de dados`);
})

module.exports = new DbConnection();