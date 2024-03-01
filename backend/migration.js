const mysql = require('mysql');
const migration = require('mysql-migrations');

const connection = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'fyp'
});

migration.init(connection, __dirname + '/migrations', function() {
  console.log("finished running migrations");
});