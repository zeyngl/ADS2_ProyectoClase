function connection(){
    var url = 'https://h2uagtj6na.execute-api.us-east-2.amazonaws.com/version1';

    fetch(url, {
    method: 'GET',
    headers:{
        'Accept': 'application/json'
    }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', addProducts(response)));
}

function addProducts(data){
    var toJSON = JSON.parse(JSON.stringify(data));
    var lista = document.getElementById('listadoProductos');

    toJSON.forEach(function(element) {
        var divproducto = document.createElement("div");
        divproducto.setAttribute('class','product');
        divproducto.setAttribute('id',element.id);

        //seccion de imagen
        var divimagen = document.createElement("div");
        divimagen.setAttribute('class','product-img');

        var img = document.createElement("img");
        img.setAttribute('src',element.url);
        img.setAttribute('height','100px');
        img.setAttribute('width','100px');
        divimagen.appendChild(img);


        //seccion de datos
        var divdata = document.createElement("div");
        divdata.setAttribute('class','product-body');

        var pcategoria = document.createElement("p");
        pcategoria.setAttribute('class','product-category');
        pcategoria.innerHTML = element.categoria;
        pcategoria.innerText = element.categoria;

        var hnombre = document.createElement("h3");
        hnombre.setAttribute('class','product-name');
        hnombre.innerHTML = element.nombre;
        hnombre.innerText = element.nombre;

        var hprecio = document.createElement("h4");
        hprecio.setAttribute('class','product-price');
        hprecio.innerHTML = element.precio;
        hprecio.innerText = element.precio;

        divdata.appendChild(pcategoria);
        divdata.appendChild(hnombre);
        divdata.appendChild(hprecio);


        //seccion del boton de compra
        var divcart = document.createElement("div");
        divcart.setAttribute('class','add-to-cart');

        var button = createElement("button");
        button.setAttribute("class","add-to-cart-btn");
        button.setAttribute('id',element.id);
        //ponerle un evento

        divcart.appendChild(button);


        divproducto.appendChild(divimagen);
        divproducto.appendChild(divdata);
        divproducto.appendChild(divcart);

        lista.appendChild(divproducto);

    });

    return '200';
}