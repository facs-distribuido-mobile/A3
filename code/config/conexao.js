const sql = require('mysql');

class DbConnection {
    createConnection(){
        return sql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'database'
        })
    }
}

module.exports = new DbConnection();