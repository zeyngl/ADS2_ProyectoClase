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
function setNewUser(){
  let dpi = document.getElementById("dpi").value;
  let nombre = document.getElementById("nombre").value;
  let correo = document.getElementById("correo").value;
  let pass = document.getElementById("pass").value;
  let conf = document.getElementById("confpass").value;
  let direccion = document.getElementById("direccion").value;
  let fecha = document.getElementById("datenac").value;

  if(pass == conf){
    let url = 'http://localhost:4000/registro';
        let data =  {
            dpi: dpi,
            nombre: nombre,
            correo: correo,
            pass: pass,
            direccion: direccion,
            fecha: fecha
        };
        console.log(data)
        fetch(url, {
            method: 'POST',
            query: JSON.stringify(data),
            body: JSON.stringify(data),
            headers:{
                "Content-Type" : "application/json"  }
            }).then(res => console.log('Success:', limp(response)))
            .catch(error => console.log('Error:', error))
            .then(response => console.log('Success:', limp(response)));
  }
  else{
    alert("Passwords no coinciden")
  }
}


function limp(response){
  //limpieza
  alert("Usuario creado")
  location.href ="../SitioWeb/login.html";
  let dpi = document.getElementById("dpi").value;
  let nombre = document.getElementById("nombre").value;
  let correo = document.getElementById("correo").value;
  let pass = document.getElementById("pass").value;
  let conf = document.getElementById("confpass").value;
  let direccion = document.getElementById("direccion").value;
  let fecha = document.getElementById("datenac").value;
  dpi.value=''
  nombre.value=''
  correo.value=''
  pass.value=''
  conf.value=''
  direccion.value=''
  fecha.value=''
  return response;
}
