const mysql = require('mysql');

const con = mysql.createConnection({
  host     : "database-2.cxqmakqozr01.us-east-1.rds.amazonaws.com",
  user     : "admin",
  password : "123456789",
  port     : "3306"
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.end();
});
