const mysql = require("mysql");
const util = require("util");

// creates the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "personnelDB"
});

// connects to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
});
connection.query = util.promisify(connection.query);

module.exports = connection;
