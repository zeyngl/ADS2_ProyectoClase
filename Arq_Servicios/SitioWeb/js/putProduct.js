function setNewProduct(){
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let categoria = document.getElementById("categoria").value;
    

    let url = 'http://3.12.111.59:4000/products';
        let data =  {
            Nombre: nombre,
            precio: precio,
            categoria: categoria
        };
        console.log(data)
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                "Content-Type" : "application/json"  }
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', limp(response)));
    
}

function limp(response){
  //limpieza
  let nombre = document.getElementById("nombre");
  let precio = document.getElementById("precio");
  let categoria = document.getElementById("categoria");
  

  precio.value='';
  nombre.value='';
  categoria.value='Seleccionar una';
  return response;
}