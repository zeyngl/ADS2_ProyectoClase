function session(){
    var sucess = sessionStorage.getItem("user-nit");
    if(sucess == null){
        window.location.href = "login.html";
    }

    var namesucess = sessionStorage.getItem("user-name");

    var nit = document.getElementById("nit");
    nit.value = sucess;

    var name = document.getElementById("nombre");
    name.value = namesucess;
}


function change_data(){
    var nit = document.getElementById("nit").value;
    var name = document.getElementById("nombre").value;
    var contra_act= document.getElementById("contra").value;
    var contra_new= document.getElementById("contra-nueva").value;

    if(name==""){
        name = sessionStorage.getItem("user-name");
    }

    var cambiar_contra = true;
    if(contra_act=="" | contra_new==""){
        cambiar_contra = false;
    }

    var data;
    if(cambiar_contra){
        data={
            cambioc: true,
            nit: nit,
            nombre: name,
            contraAct: contra_act,
            contraNew: contra_new
        };
    }else{
        data={
            cambioc: false,
            nit: nit,
            nombre: name,
            contraAct: "",
            contraNew: ""
        };
    }


    var json = JSON.parse(JSON.stringify(data));

    var url = 'falta especificar la url';//falta implementar

    fetch(url, {
    method: 'POST',
    body: JSON.stringify(json),
    headers:{
        'Accept': 'application/json'
    }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}