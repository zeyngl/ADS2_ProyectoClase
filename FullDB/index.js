const express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send({ "message": "Entrando al Api" });
});


/**Registrar nuevo producto */
app.post('/producto', (req, res) => {
    let registro = req.body.registro;
    console.log(registro);
    MongoClient.connect(process.env.API_KEY, { useNewUrlParser: true }, function (err, db) {
        if (!err) {
            console.log("We are connected");
            var dbo = db.db("AD2");
            dbo.collection("FullDB").insertOne(registro, function (err, res) {
                if (!err) {
                    console.log("1 document inserted");                    
                    db.close();                    
                }
            });

        }
    });
    res.status(200).send({ "message": "Producto registrado correctamente" });
});


/**Obtiene el listado de todos los productos */
app.get('/producto', (req, res) => {        
    MongoClient.connect(process.env.API_KEY, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("AD2");
        dbo.collection("FullDB").find({}).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            res.status(200).send(JSON.stringify(result));
        });
    });
});


/** Elimina todos los productos de la DB */
app.get('/delete', (req, res) => {        
    MongoClient.connect(process.env.API_KEY, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("AD2");
        dbo.collection("FullDB").deleteMany({}, function (err, obj) {
            if (err) throw err;
            console.log(obj.result.n + " document(s) deleted");
            db.close();
            res.status(200).send({ total: obj.result.n });
        });
    });
});



app.listen(port, () => {
    console.log(`API Rest corriendo en http://localhost:${port}`);

});