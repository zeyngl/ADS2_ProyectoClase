const fs = require("fs");
const profiler = require("v8-profiler");

const snapshot = profiler.takeSnapshot();

snapshot.export(function(error,result){
    //obtenemos el consumo de memoria actual
    fs.writeFileSync("nodetest.heapsnapshot",result);
    snapshot.delete();
});

setTimeout(function(){
    //obtenemos resultados despues de los 2 segundos
    const snapshotAfter = profiler.takeSnapshot();

    snapshotAfter.export(function(error,result){
        //guardamos los nuevos resultados
        fs.writeFileSync("nodetestafter.heapsnapshot",result);
        //terminamos el profiling
        snapshotAfter.delete();
        process.exit();
    });

},2000);//ejecutamos durante 2 segundos