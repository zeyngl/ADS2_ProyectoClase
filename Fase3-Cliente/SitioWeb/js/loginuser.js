
function loading(){
  var logueado = sessionStorage.getItem("user-log");
  if(logueado == "0"){
      sessionStorage.setItem("user-nit","0");
      sessionStorage.setItem("user-type","2");
      sessionStorage.setItem("user-name","nein");
      sessionStorage.setItem("user-log", "0");
  }else{
      window.location.href = "index.html";
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
    alert("Usuario no Registrado.");
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
      sessionStorage.setItem("user-nit",nit);
      sessionStorage.setItem("user-type",tipo);
      sessionStorage.setItem("user-name",nombre);
      sessionStorage.setItem("user-log", "1");
    }else{
      alert("Password Incorrecta.");
      return false;
    }
  }
}
