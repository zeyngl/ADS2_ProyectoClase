var express = require('express');
var app = express();
const mysql = require('mysql');

const con = mysql.createConnection({
  host     : "database-2.cxqmakqozr01.us-east-1.rds.amazonaws.com",
  user     : "admin",
  password : "123456789",
  port     : "3306"
});
app.post('/products', (req, res) => {
    if (req.query.Nombre && req.query.precio && req.query.categoria) {
        console.log('Request received');
        con.connect(function(err) {
            con.query(`INSERT INTO Fase2.Producto (Nombre, Precio,Categoria) VALUES ('${req.query.Nombre}', '${req.query.precio}', '${req.query.categoria}')`, function(err, result, fields) {
                if (err) res.send(err);
                if (result) res.send({Nombre: req.query.Nombre, precio: req.query.precio, categoria: req.query.categoria});
                if (fields) console.log(fields);
            });
        });
    } else {
        console.log('Missing a parameter');
    }
});

app.get('/products', (req, res) => {
    con.connect(function(err) {
        con.query(`SELECT * FROM Fase2.Producto`, function(err, result, fields) {
            if (err) res.send(err);
            if (result) res.send(result);
        });
    });
});
app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
