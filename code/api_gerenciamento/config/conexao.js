const sql = require('mysql');
require('dotenv').config();

class DbConnection {
    createConnection(){
        return sql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_ROOT,
            password: process.env.MYSQL_ROOT_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            port: process.env.MYSQL_PORT
        });
    }
}

module.exports = new DbConnection();