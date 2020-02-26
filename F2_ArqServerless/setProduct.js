/*
Funcion destinada a agregar imagenes de productos y su respectiva informacion en
una base de datos no relacional y la imagen en un bucket de s3
*/

var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();
const fs = require('fs');
const s3 = new AWS.S3();


exports.handler = function(event, context) {
    
    /*event:
        -base64Image
        -extencion
        -nombre
        -precio
    */
    
    let buffer = new Buffer(event.base64Image,"base64");
    var url = putfile(buffer,event.nombre,event.extencion);
    
    var tableName = "Producto";
    var _id = Date.now().toString();

    const params = {
        TableName: tableName,
        Item: {
            id: {
                N: _id
            },
            url: {
                S: "http://www.proyectoclase.com.s3-website.us-east-2.amazonaws.com/" + url
            },
            nombre: {
                S: event.nombre
            },
            precio: {
                S: event.precio.toString()
            }
        }
    };

    dynamodb.putItem(params, function(err, data) {
        if (err) {
            context.fail('ERROR: Dynamo failed: ' + err);
        } else {
            context.succeed('SUCCESS');
        }
    });
};




const putfile = async (buffer, nombre, extension) => {
    let name_buquet = "productos/"+nombre+"."+extension;
    
    let params = {
        Bucket : "www.proyectoclase.com",
        Key : name_buquet,
        Body : buffer
    }
    
    await s3.putObject(params).promise();
    
    return {
        statusCode: 200,
        body: name_buquet
    };
}

