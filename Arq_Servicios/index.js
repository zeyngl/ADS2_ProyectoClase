var express = require('express');
var app = express();
const mysql = require('mysql');
var cors = require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(cors())

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

app.get('/loginlista', (req, res) => {
    con.connect(function(err) {
        con.query(`SELECT * FROM Fase2.Usuario`, function(err, result, fields) {
            if (err) res.send(err);
            if (result) res.send(result);
        });
    });
});

app.get('/buscarcorreo/', function (req, res) {
    var ext = req.query.ext;
    var sql = "SELECT id as id,nombre as nombre, pass as pass, nit as nit, tipouser as tipo FROM Fase2.Usuario WHERE nit  ='"+ext+"';";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        console.log(result)
        res.send(result);//devolvemos que si encontro por lo menos 1
    });
});

app.post('/registro', (req, res) => {
    console.log(req.body);
    if (req.body.dpi && req.body.nombre && req.body.correo && req.body.pass && req.body.direccion && req.body.fecha) {
        console.log('Request received');
        con.connect(function(err) {
            con.query(`INSERT INTO Fase2.Usuario(nit,nombre,correo,direccion,pass,nacimiento,tipouser) VALUES ('${req.body.dpi}', '${req.body.nombre}', '${req.body.correo}', '${req.body.pass}', '${req.body.direccion}', '${req.body.fecha}',1)`, function(err, result, fields) {
                if (err) console.log(err);
                if (result) res.send({dpi: req.body.dpi, nombre: req.body.nombre, correo: req.body.correo, pass: req.body.pass, direccion: req.body.direccion, fecha: req.body.fecha});
                if (fields) console.log(fields);
            });
        });
    } else {
        console.log('Missing a parameter');
    }
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
