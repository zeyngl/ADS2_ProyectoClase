function loading(){
  var sucess = sessionStorage.getItem("user-nit");
  if(sucess != null){
      window.location.href = "index.html";
  }
}


function login(){
  var correo = document.getElementById('username').value;//realmente es el nit
  var pass = document.getElementById('password').value
  var url ="http://ec2-13-58-107-174.us-east-2.compute.amazonaws.com:4000/buscarcorreo/?ext="+correo;
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
      window.location.href = "index.html";
      return true;
    }else{
      alert("Password Incorrecta.");
      return false;
    }
  }
}
