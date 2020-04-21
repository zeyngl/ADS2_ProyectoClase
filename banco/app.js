const express = require("express");
const app = express();
var bodyParser = require('body-parser')

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
    var banco = req.body.banco;

    var query = "INSERT INTO usuario (name,password,email,saldo,banco) VALUES("+name+","+passwd+","+correo+","+saldo+","+banco+");";
    var result = "";

    connection.query(query, function(err, results){
        if(err) throw err;
        result = results;
    });

    res.send(result);
});


app.get('/',function(req,res){
    res.send(" hola");
});

app.post('/retiro', function (req, res) {

    console.log(JSON.stringify(req.body));
    var toJSON = JSON.parse(JSON.stringify(req.body));
    var correo = toJSON.email;
    var retiro = parseInt(toJSON.saldo);

    var query1 = "SELECT saldo FROM usuario WHERE correo = '"+correo+"';";
    var saldo = 0;

    connection.query(query1, function(err, results){
        if(err) throw err;
        saldo = parseInt(results);

        if(saldo >= retiro){
            var query2 = "UPDATE table_name SET saldo="+(saldo - retiro)+" WHERE correo='"+correo+"'";
            connection.query(query2, function(err, results){
                if(err) throw err;
            });

            res.send("transacción aprobada");
        }else{
            res.send("no hay fondos");
        }
    });
});



app.post('/deposito', function (req, res) {
    var correo = req.body.email;
    var deposito = parseInt(req.body.saldo);

    var query1 = "SELECT saldo FROM usuario WHERE correo = '"+correo+"';";
    var saldo = 0;

    connection.query(query1, function(err, results){
        if(err) throw err;
        saldo = parseInt(results);

        var query2 = "UPDATE table_name SET saldo="+(saldo + retiro)+" WHERE correo='"+correo+"'";
        connection.query(query2, function(err, results){
            if(err) throw err;
        });

        res.send("transacción aprobada");
    });
});





app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});