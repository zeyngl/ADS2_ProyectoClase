
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
    toJSON.forEach(function(element) {
      pass = element.pass;
      tipo = element.tipo;
    });

    if (contra == pass){
      if(tipo==0){
        alert("redirigiendo a administrador")
      }else if(tipo==1){
        alert("redirigiendo a comprador")
      }
    }else{
      alert("Password incorrecta")
      return false;
    }
    
  }
}
