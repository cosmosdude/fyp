let config = require('./configs/db.config')

const mysql = require('mysql2');

module.exports = mysql.createPool({
    connectionLimit : 10,
    ...config
});