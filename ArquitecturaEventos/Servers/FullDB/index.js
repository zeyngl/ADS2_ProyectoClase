const express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');



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
    var registro = { 'Nombre': req.body.nombre, 'Categoria': req.body.categoria, 'Precio': req.body.precio };    
    MongoClient.connect("mongodb+srv://Lizama:Micronpe.-1@proyectoarqui-ydupz.gcp.mongodb.net/test?retryWrites=true", { useNewUrlParser: true }, function (err, db) {
        if (!err) {
            console.log("We are connected");
            var dbo = db.db("AD2");
            dbo.collection("FullDB").insertOne(registro, function (err, res) {
                if (err) {                    
                    console.log('Error en Queue');
                }
            });
            dbo.collection("Queue").insertOne(registro, function (err, res) {
                if (!err) {                                                           
                    db.close();                        
                }else{
                    console.log('Error en Queue');
                }
            });           

        }
    });
    res.status(200).send({ "message": "Producto registrado correctamente" });
});


/**Obtiene el listado de todos los productos */
app.get('/producto', (req, res) => {        
    MongoClient.connect("mongodb+srv://Lizama:Micronpe.-1@proyectoarqui-ydupz.gcp.mongodb.net/test?retryWrites=true", { useNewUrlParser: true }, function (err, db) {
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
app.delete('/producto', (req, res) => {        
    MongoClient.connect("mongodb+srv://Lizama:Micronpe.-1@proyectoarqui-ydupz.gcp.mongodb.net/test?retryWrites=true", { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("arqui");
        dbo.collection("FullDB").deleteMany({}, function (err, obj) {
            if (err) throw err;
            console.log(obj.result.n + " document(s) deleted");
            db.close();
            res.status(200).send({ total: obj.result.n });
        });
    });
});

/**Agrega el elemento a la cola de espera */
function insertIntoQueue(registro){
    MongoClient.connect("mongodb+srv://Lizama:Micronpe.-1@proyectoarqui-ydupz.gcp.mongodb.net/test?retryWrites=true", { useNewUrlParser: true }, function (err, db) {
        if (!err) {
            console.log("We are connected");
            var dbo = db.db("AD2");
            dbo.collection("Queue").insertOne(registro, function (err, res) {
                if (!err) {
                    console.log("1 document inserted");                    
                    db.close();                    
                }
            });

        }
    });
}

/**Obtiene el listado de los elementos en cola y los elimina posteriormente*/
app.get('/Queue', (req, res) => {        
    MongoClient.connect("mongodb+srv://Lizama:Micronpe.-1@proyectoarqui-ydupz.gcp.mongodb.net/test?retryWrites=true", { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("AD2");
        dbo.collection("Queue").find({}).toArray(function (err, result) {
            if (err) throw err;            
            res.status(200).send(JSON.stringify(result));            
        });
        dbo.collection("Queue").deleteMany({}, function (err, obj) {
            if (err) throw err;
            console.log(obj.result.n + " document(s) deleted");
            db.close();                
        });
    });
});

/**Obtiene el listado de los elementos en cola y los elimina posteriormente*/
app.get('/QueueRead', (req, res) => {        
    MongoClient.connect("mongodb+srv://Lizama:Micronpe.-1@proyectoarqui-ydupz.gcp.mongodb.net/test?retryWrites=true", { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("AD2");
        dbo.collection("Queue").find({}).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            res.status(200).send(JSON.stringify(result));            
        });
    });
});

app.delete('/Queue', (req, res) => {        
    clearQueue(res);    
});

function clearQueue(response){
    MongoClient.connect("mongodb+srv://Lizama:Micronpe.-1@proyectoarqui-ydupz.gcp.mongodb.net/test?retryWrites=true", { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("AD2");
        dbo.collection("Queue").deleteMany({}, function (err, obj) {
            if (err) throw err;
            console.log(obj.result.n + " document(s) deleted");
            db.close();    
            if(response!= null)        
                response.status(200).send({ total: obj.result.n });
        });
    });
}



app.listen(port, () => {
    console.log(`API Rest corriendo en http://localhost:${port}`);

});