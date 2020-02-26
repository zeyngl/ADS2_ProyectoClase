
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();


exports.handler = function(event, context) {
    const params = {
        TableName : "Producto"
    };

    dynamodb.scan(params, function(err, data) {
        if (err) {
            context.fail('ERROR: Dynamodb failed: ' + err);
        } else {
            context.succeed(JSON.parse(JSON.stringify(data)));
            return JSON.stringify(data);
        }
    });
};
