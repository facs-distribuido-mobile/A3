const mySql = require('mysql');

class DbConnection {

    createConnection() {
        return mySql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_ROOT,
            password: process.env.MYSQL_ROOT_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            port: process.env.MYSQL_PORT
        });
    }
}

module.exports = new DbConnection();