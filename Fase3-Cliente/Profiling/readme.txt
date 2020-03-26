Para ejecutar el profiling utilizamos 

>>> node cpu-profile.js o memoru-profile.js

Los archivos generados se abren con la herramienta
profile que incluye chrome.

Video guia:
- https://youtu.be/gL2GGcV_f20

- https://medium.com/@ashok.tankala/profiling-node-js-application-using-v8-profiler-5d8bd7f662e1


/* EJEMPLO DE IMPLEMENTACION EN SERVIDOR NODEJS (Se puede ver en el link de arriba)

var express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const controller = require('./controller');
const profiler = require('v8-profiler');
const fs = require('fs');

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('public'));

// Paths
app.post('/getWordsCountInDesc', function (req, res) {
    controller.getWordsCountInDesc(req, res);
});

app.get('/doCPUProfiling/profileId/:profileId/durationInSec/:durationInSec', function (req, res) {
    let profileId = req.params['profileId'];
    let durationInMilliSec = req.params['durationInSec'] * 1000;
    // Start profiling
    profiler.startProfiling(profileId);
    setTimeout(function () {
        stopProfiling(profileId);
    }, durationInMilliSec);
    res.json({});
});

var stopProfiling = function(profileId) {
    let profile = profiler.stopProfiling(profileId);
    fs.writeFile(__dirname + '/' + profileId + '.cpuprofile', JSON.stringify(profile), function () {
        console.log('Profiler data written');
    });
}

app.listen(3000);

*/