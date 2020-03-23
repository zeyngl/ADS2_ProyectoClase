
function loading(){
  var logueado = sessionStorage.getItem('logueado');
  if(logueado == 0){
    sessionStorage.setItem("nitlog", "0");
    sessionStorage.setItem("tipolog", 2);
    sessionStorage.setItem("nombrelog","nein");
    sessionStorage.setItem("logueado", 0);//true or false
  }else{
    var tipo = sessionStorage.getItem('tipolog');
    if(tipo==0){
      //redirigir a administrador
    }else {
      //redirigir a comprador
    }
  }

}

function login(){
  var correo = document.getElementById('username').value;
  var pass = document.getElementById('password').value
  var url ="http://localhost:4000/buscarcorreo/?ext="+correo;
  fetch(url, {
        method: 'GET',
        headers:{
            'Accept': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', Users(response,pass)));
}


function Users(data,contra){
  if(data.length==0){
    alert("El usuario no está registrado.");
    return false;
  }else{
    var toJSON = data;
    var pass;
    var tipo;
    var nombre;
    var nit;
    toJSON.forEach(function(element) {
      pass = element.pass;
      tipo = element.tipo;
      nombre = element.nombre;
      nit  = element.nit;
    });

    if (contra == pass){
      sessionStorage.setItem("nitlog", nit);
      sessionStorage.setItem("tipolog", tipo);
      sessionStorage.setItem("nombrelog",nombre);
      sessionStorage.setItem("logueado", 1);
      if(tipo==0){
        //Mandar a los tipo administrador
        //location.href ="../SitioWeb/registro.html";
      }else if(tipo==1){
        //Mandar a los tipo comprador
        //location.href ="../SitioWeb/registro.html";
      }
    }else{
      alert("Password incorrecta")
      return false;
    }

  }
}
