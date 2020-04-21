const express = require("express");
const app = express();

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '54.211.1.152',
    user     : 'lizama',
    password : 'user_password'
});


connection.connect();


app.post('/crearCuenta', function (req, res) {
    var name = req.body.name;
    var passwd = req.body.password;
    var correo = req.body.email;
    var saldo = req.body.saldo;

    var query = "INSERT INTO usuario (name,password,email,saldo) VALUES("+name+","+passwd+","+correo+","+saldo+");";
    var result = "";

    connection.query(query, function(err, results){
        if(err) throw err;
        result = results;
    });

    res.send(result);
});


app.post('/retiro', function (req, res) {
    var correo = req.body.email;
    var retiro = req.body.saldo;

    var query = "CALL retiro("+correo+","+retiro+")";

    connection.query(query, function(err, results){
        if(err) throw err;
        result = results;
    });

    res.send(result);
});


app.post('/deposito', function (req, res) {
    var correo = req.body.email;
    var deposito = req.body.saldo;

    var query = "CALL deposito("+correo+","+deposito+")";

    connection.query(query, function(err, results){
        if(err) throw err;
        result = results;
    });

    res.send(result);
});






app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});