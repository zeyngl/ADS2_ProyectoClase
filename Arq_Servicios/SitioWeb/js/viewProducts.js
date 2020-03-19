function connection(){
    var url = 'http://3.12.111.59:4000/products';

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
    console.log(data);
    var toJSON = data;
    
    
    var lista = document.getElementById('listadoProductos');
    
    toJSON.forEach(function(element) {
        var divproducto = document.createElement("div");
        divproducto.setAttribute("class","product");
        divproducto.setAttribute('id',element.ID);

        

        //seccion de datos
        var divdata = document.createElement("div");
        divdata.setAttribute('class','product-body');

        var pcategoria = document.createElement("p");
        pcategoria.setAttribute('class','product-category');
        pcategoria.innerHTML = element.Categoria;
        pcategoria.innerText = element.Categoria;

        var hnombre = document.createElement("h3");
        hnombre.setAttribute('class','product-name');
        hnombre.innerHTML = element.Nombre;
        hnombre.innerText = element.Nombre;

        var hprecio = document.createElement("h4");
        hprecio.setAttribute('class','product-price');
        hprecio.innerHTML = "Q"+element.Precio;
        hprecio.innerText = "Q"+element.Precio;

        divdata.appendChild(pcategoria);
        divdata.appendChild(hnombre);
        divdata.appendChild(hprecio);


        //seccion del boton de compra
        var divcart = document.createElement("div");
        divcart.setAttribute('class','add-to-cart');

        var button1 = document.createElement("button");
        button1.setAttribute("class","add-to-cart-btn");
        button1.setAttribute('id',element.ID);
        button1.innerHTML = "Agregar al Carrito";
        button1.innerText = "Agregar al Carrito";

        var i1 = document.createElement("i");
        i1.setAttribute("class","fa fa-shopping-cart");

        button1.appendChild(i1);
        divcart.appendChild(button1);

       // divproducto.appendChild(divimagen);
        divproducto.appendChild(divdata);
        divproducto.appendChild(divcart);

        lista.appendChild(divproducto);
    });

    return '200';
}