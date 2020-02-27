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
    var toJSON = JSON.parse(JSON.stringify(data)).Items;
    var lista = document.getElementById('listadoProductos');

    toJSON.forEach(function(element) {
        var divproducto = document.createElement("div");
        divproducto.setAttribute("class","product");
        divproducto.setAttribute('id',element.id.N);

        //seccion de imagen
        var divimagen = document.createElement("div");
        divimagen.setAttribute("align","center");

        var img = document.createElement("img");
        img.setAttribute('src',element.url.S);
        img.setAttribute('alt','');
        img.setAttribute('height','200px');
        img.setAttribute('width','200px');
        divimagen.appendChild(img);

        //seccion de datos
        var divdata = document.createElement("div");
        divdata.setAttribute('class','product-body');

        var pcategoria = document.createElement("p");
        pcategoria.setAttribute('class','product-category');
        pcategoria.innerHTML = element.categoria.S;
        pcategoria.innerText = element.categoria.S;

        var hnombre = document.createElement("h3");
        hnombre.setAttribute('class','product-name');
        hnombre.innerHTML = element.nombre.S;
        hnombre.innerText = element.nombre.S;

        var hprecio = document.createElement("h4");
        hprecio.setAttribute('class','product-price');
        hprecio.innerHTML = "Q"+element.precio.S;
        hprecio.innerText = "Q"+element.precio.S;

        divdata.appendChild(pcategoria);
        divdata.appendChild(hnombre);
        divdata.appendChild(hprecio);


        //seccion del boton de compra
        var divcart = document.createElement("div");
        divcart.setAttribute('class','add-to-cart');

        var button1 = document.createElement("button");
        button1.setAttribute("class","add-to-cart-btn");
        button1.setAttribute('id',element.id.N);
        button1.innerHTML = "Agregar al Carrito";
        button1.innerText = "Agregar al Carrito";

        var i1 = document.createElement("i");
        i1.setAttribute("class","fa fa-shopping-cart");

        button1.appendChild(i1);
        divcart.appendChild(button1);

        divproducto.appendChild(divimagen);
        divproducto.appendChild(divdata);
        divproducto.appendChild(divcart);

        lista.appendChild(divproducto);
    });

    return '200';
}