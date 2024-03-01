const connection = require('./mysql')
const migration = require('mysql-migrations');

migration.init(connection, __dirname + '/migrations', function() {
  console.log("finished running migrations");
});