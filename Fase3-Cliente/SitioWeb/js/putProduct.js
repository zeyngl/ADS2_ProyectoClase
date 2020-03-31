function session(){
    var sucess = sessionStorage.getItem("user-nit");

    if(sucess == null){
        window.location.href = "login.html";
    }
    
    if(sucess != "0000000"){
        window.location.href = "index.html";
    }
}


function init(){
    session();
}

function setNewProduct(){
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let categoria = document.getElementById("categoria").value;
    let file = document.getElementById("foto").files[0];
    let file_name = document.getElementById("foto").files[0].name;
    let file_ext = (file_name.substring(file_name.lastIndexOf("."))).toLowerCase().replace(".","");

    let base64;
    let reader = new FileReader();

    if(file){
        reader.readAsDataURL(file);
    }

    reader.onloadend = function(){
        base64=reader.result;
        base64=base64.replace('data:image/png;base64,','');
        base64=base64.replace('data:image/jpeg;base64,','');

        let url = 'https://m46lnkec4a.execute-api.us-east-2.amazonaws.com/version1';
        let data =  {
            imagen: base64,
            extension: file_ext,
            nombre: nombre,
            precio: precio,
            categoria: categoria
        };

        fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            "Content-Type" : "application/json"  }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', limp(response)));
    };
}

function limp(response){
  //limpieza
  let nombre = document.getElementById("nombre");
  let precio = document.getElementById("precio");
  let categoria = document.getElementById("categoria");
  let file = document.getElementById("foto");

  precio.value='';
  nombre.value='';
  categoria.value='Seleccionar una';
  file.value='';

  return response;
}