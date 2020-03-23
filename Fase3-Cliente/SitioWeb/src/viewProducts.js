"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Conection_1 = require("./Conection");
var viewProducts = /** @class */ (function (_super) {
    __extends(viewProducts, _super);
    function viewProducts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    viewProducts.prototype.session = function () {
        var nitsuccess = sessionStorage.getItem("user-nit");
        if (nitsuccess == null) {
            window.location.href = "login.html";
        }
    };
    viewProducts.prototype.getResponse = function (url, methodType, dataType, data) {
        var respuesta = "";
        if (methodType == "GET") {
            fetch(url, {
                method: methodType,
                headers: {
                    'Accept': 'application/' + dataType
                }
            }).then(function (res) { return res.json(); })["catch"](function (error) { return respuesta = error; })
                .then(function (response) { return respuesta = JSON.stringify(response); });
        }
        else if (methodType == "POST") {
            $.ajax({ url: url,
                type: methodType,
                dataType: dataType,
                data: data,
                async: false,
                success: function (response) {
                    respuesta = JSON.stringify(response);
                }
            });
        }
        return respuesta;
    };
    viewProducts.prototype.addProducts = function () {
        //this.session();
        var url = 'https://h2uagtj6na.execute-api.us-east-2.amazonaws.com/version1';
        var data = this.getResponse(url, "GET", "json", null);
        var toJSON = JSON.parse(JSON.stringify(data)).Items;
        var lista = document.getElementById('listadoProductos');
        toJSON.forEach(function (element) {
            //id del producto
            var divproducto = document.createElement("div");
            divproducto.setAttribute("class", "product");
            divproducto.setAttribute('id', element.id.N);
            //seccion de imagen
            var divimagen = document.createElement("div");
            divimagen.setAttribute("align", "center");
            var img = document.createElement("img");
            img.setAttribute('src', element.url.S);
            img.setAttribute('alt', '');
            img.setAttribute('height', '200px');
            img.setAttribute('width', '200px');
            divimagen.appendChild(img);
            //seccion de datos
            var divdata = document.createElement("div");
            divdata.setAttribute('class', 'product-body');
            var pcategoria = document.createElement("p");
            pcategoria.setAttribute('class', 'product-category');
            pcategoria.innerHTML = element.categoria.S;
            pcategoria.innerText = element.categoria.S;
            var hnombre = document.createElement("h3");
            hnombre.setAttribute('class', 'product-name');
            hnombre.innerHTML = element.nombre.S;
            hnombre.innerText = element.nombre.S;
            var hprecio = document.createElement("h4");
            hprecio.setAttribute('class', 'product-price');
            hprecio.innerHTML = "Q" + element.precio.S;
            hprecio.innerText = "Q" + element.precio.S;
            divdata.appendChild(pcategoria);
            divdata.appendChild(hnombre);
            divdata.appendChild(hprecio);
            //seccion del boton de compra
            var divcart = document.createElement("div");
            divcart.setAttribute('class', 'add-to-cart');
            var button1 = document.createElement("button");
            button1.setAttribute("class", "add-to-cart-btn");
            button1.setAttribute('id', element.id.N);
            var namebtn = element.id.N + "," + element.categoria.S + "," + element.nombre.S + "," + element.precio.S;
            button1.setAttribute('name', namebtn);
            button1.setAttribute('onclick', 'agregarCarrito(this);');
            button1.innerHTML = "Agregar al Carrito";
            button1.innerText = "Agregar al Carrito";
            var i1 = document.createElement("i");
            i1.setAttribute("class", "fa fa-shopping-cart");
            button1.appendChild(i1);
            divcart.appendChild(button1);
            divproducto.appendChild(divimagen);
            divproducto.appendChild(divdata);
            divproducto.appendChild(divcart);
            lista.appendChild(divproducto);
        });
    };
    viewProducts.prototype.agregarCarrito = function (producto) {
        var datos = producto.getAttribute("name");
        var array = datos.split(",");
        var f = new Date();
        var date = f.getFullYear() + "" + (f.getMonth() + 1) + "" + f.getDate(); //YYYYMMDD
        var idcliente = sessionStorage.getItem("user-nit");
        var datos = {
            registro: JSON.stringify({
                fecha: +date,
                nit: idcliente,
                id: array[0],
                categoria: array[1],
                nombre: array[2],
                precio: array[3]
            })
        };
        var url = 'http://ec2-54-89-91-178.compute-1.amazonaws.com:3000/producto';
        var response = this.getResponse(url, "POST", "json", datos);
        alert(response);
    };
    return viewProducts;
}(Conection_1.Conection));
