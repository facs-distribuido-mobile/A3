const sql = require('mysql');

const DbConnection = sql.createConnection(
    {
        host: 'localhost',
        user: 'admin',
        password: 'secret',
        database: 'my_db'
    }
)

module.exports = DbConnection;