var mysql = require("mysql");

var conn = mysql.createConnection({
  HOST: "us-cdbr-east-02.cleardb.com",
  USER: "b90ca7786cf824",
  PASSWORD: "bc0b8a35",
  DB: "heroku_fd69cfdb43ac70f",
});

conn.connection();
module.exports = conn;
