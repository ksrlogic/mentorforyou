var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "ksrlogic",
  password: "fifa2035",
  database: "opentutorials",
  port: "3307",
});

connection.connect();

connection.query("SELECT * FROM topic", function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

connection.end();
