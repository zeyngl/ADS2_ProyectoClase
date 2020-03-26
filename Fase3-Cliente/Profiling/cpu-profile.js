const fs = require("fs");
const profiler = require("v8-profiler");

profiler.startProfiling("Prueba",true);

setTimeout(function(){
    //una vez pasen los 2 seg obtenemos resultados
    const profile = profiler.stopProfiling("Prueba"); 
    profile.export(function(error,result){
        //guardamos los sesultados en un archivo
        fs.writeFileSync("nodetest.cpuprofile",result);
        //terminamos el profiling
        profile.delete();
        process.exit();
    });
},2000); //se ejecutara por 2 segundos