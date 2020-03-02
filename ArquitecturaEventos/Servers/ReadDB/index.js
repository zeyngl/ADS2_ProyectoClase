const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
var timeout = 7500;



const app = express();
const port = process.env.PORT || 4000;



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send({ "message": "Entrando al Api" });
});


function listenForChanges() {    
    axios.get('http://localhost:3000/Queue')
        .then(response => {
            let data = response.data;
            console.log(data.length);
            if(data.length>0){
                agregarProducto(data);
            }
        })
        .catch(error => {
            console.log(error);
        });
}


function agregarProducto(data){    
    console.log('Voy a agregar un producto');
    MongoClient.connect("mongodb+srv://Lizama:Micronpe.-1@proyectoarqui-ydupz.gcp.mongodb.net/test?retryWrites=true", { useNewUrlParser: true }, function (err, db) {
        if (!err) {
            console.log("We are connected");
            var dbo = db.db("AD2");
            data.forEach(element => {
                console.log(element);
                dbo.collection("ReadDB").insertOne({ 'Nombre': element.Nombre, 'Categoria': element.Categoria, 'Precio': element.Precio }, function (err, res) {
                    if (!err) {
                        console.log("1 document inserted");                                                                    
                    }
                });
            });
            db.close();
        }
    });
}



/**Obtiene el listado de todos los productos */
app.get('/producto', (req, res) => {
    MongoClient.connect("mongodb+srv://Lizama:Micronpe.-1@proyectoarqui-ydupz.gcp.mongodb.net/test?retryWrites=true", { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("AD2");
        dbo.collection("ReadDB").find({}).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            res.status(200).send(JSON.stringify(result));
        });
    });
});

app.post('/timeout', (req, res) => {
    timeout=req.body.timeout;
    res.status(200).send("Intervalo cambiado");
});



app.listen(port, () => {
    console.log(`API Rest corriendo en http://localhost:${port}`);

});

setInterval(listenForChanges, timeout);