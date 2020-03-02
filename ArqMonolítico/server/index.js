// -*- mode: js; js-indent-level: 2; -*-
'use strict';
const express = require('express');
const mysql = require('mysql');
//const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const db_credentials = require('./db_credentials.js')
var cors = require('cors');


//app.use(express.static('web'));
app.use(bodyParser.json({ limit: '5mb', extended: true }));
//app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
const port = process.env.PORT || 3000;
const ip = process.env.IP || "0.0.0.0";

db_credentials.host = process.env.DB_HOST || db_credentials.host;
db_credentials.port = process.env.DB_PORT || db_credentials.port;
db_credentials.user = process.env.DB_USER || db_credentials.user;
db_credentials.password = process.env.DB_PASSWORD || db_credentials.password;
db_credentials.database = process.DB_DATABASE || db_credentials.database;

var conn = mysql.createConnection(db_credentials);
/*var rawdata = fs.readFileSync('db_credentials.json');
const credentials = JSON.parse(rawdata);
var conn = mysql.createConnection({
    host: db_host,
    port: db_port,
    user: db_user,
    password: db_password,
    database: db_database
});*/

app.listen(port, () => {
  console.log('Server is listening on http://%s:%s', ip, port)
});

app.get('/', function (req, res) {
  res.send('Welcome to my API');
});

app.get('/products', (req, res) => {
  let query_script = `
  SELECT 
    p.*, 
    c.id as categ_id, 
    c.name as categ_name 
  FROM product p
    LEFT JOIN product_category c ON p.categ_id = c.id`;

  conn.query(query_script, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/products', (req, res) => {
  let body = req.body;
  conn.query('INSERT INTO product(name, unit_price, categ_id) VALUES(?,?,?)', [body.name, body.unit_price, body.categ_id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/products/categories', (req, res) => {
  conn.query('SELECT * FROM product_category', function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});