function loaddata(){
    var sucess = sessionStorage.getItem("user-nit");
    if(sucess == null){
        window.location.href = "login.html";
    }

    var namesucess = sessionStorage.getItem("user-name");

    var url ="http://ec2-3-15-180-129.us-east-2.compute.amazonaws.com:4000/buscardatos/?ext="+sucess;
    fetch(url, {
    method: 'GET',
    headers:{
        'Accept': 'application/json'
    }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', LlenarDatos(response)));
}

function LlenarDatos(data){
  if(data.length==0){
    alert("Usuario no Registrado.");
    window.location.href = "login.html"
  }else{
    var toJSON = data;
    toJSON.forEach(function(element) {
      var nittxt = document.getElementById("nit");
      nittxt.value = element.nit;
      var nametxt = document.getElementById("nombre");
      nametxt.value = element.nombre;
      var correotxt = document.getElementById("correo");
      correotxt.value = element.correo;
      var dirtxt = document.getElementById("direccion");
      dirtxt.value = element.direccion;
      var fechatxt = document.getElementById("datenac");
      fechatxt.value = element.fecha;
    });
  }
}

function change_data(){
  let nit = document.getElementById("nit").value;
  let nombre = document.getElementById("nombre").value;
  let correo = document.getElementById("correo").value;
  let direccion = document.getElementById("direccion").value;
  let fecha = document.getElementById("datenac").value;
  let url = 'http://ec2-3-15-180-129.us-east-2.compute.amazonaws.com:4000/updatedatos';
  let data =  {
      nit: nit,
      nombre: nombre,
      correo: correo,
      direccion: direccion,
      fecha: fecha
    };
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

function limp(response){
  //limpieza
  alert("Datos actualizados");
  window.location.href = "index.html";
  return response;
}

function newpass(){
  let nit = document.getElementById("nit").value;
  let pass = document.getElementById("contra").value;
  let newpass = document.getElementById("contra-nueva").value;
  let confpass = document.getElementById("contra-conf").value;
  if(newpass==confpass){
    let url = 'http://ec2-3-15-180-129.us-east-2.compute.amazonaws.com:4000/cambiarpass';
    let data =  {
        nit: nit,
        pass: newpass,
      };
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
  else {
    alert("Contraseñas no coinciden")
  }
}
