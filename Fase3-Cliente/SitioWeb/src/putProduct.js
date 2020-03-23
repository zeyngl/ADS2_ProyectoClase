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
var putProduct = /** @class */ (function (_super) {
    __extends(putProduct, _super);
    function putProduct() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    putProduct.prototype.session = function () {
        var nitsuccess = sessionStorage.getItem("user-nit");
        var typesuccess = sessionStorage.getItem("user-type");
        if (nitsuccess == null) {
            window.location.href = "login.html";
        }
        if (typesuccess != "0") {
            window.location.href = "index.html";
        }
    };
    putProduct.prototype.getResponse = function (url, methodType, dataType, data) {
        var _this = this;
        var respuesta = "";
        fetch(url, {
            method: methodType,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/" + dataType
            }
        }).then(function (res) { return res.json(); })["catch"](function (error) { return respuesta = error; })
            .then(function (response) { return respuesta = _this.limp(response); });
        return respuesta;
    };
    putProduct.prototype.setNewProduct = function () {
        var nombre = document.getElementById("nombre").value;
        var precio = document.getElementById("precio").value;
        var categoria = document.getElementById("categoria").value;
        var file = document.getElementById("foto").files[0];
        var file_name = document.getElementById("foto").files[0].name;
        var file_ext = (file_name.substring(file_name.lastIndexOf("."))).toLowerCase().replace(".", "");
        var base64;
        var reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
        }
        reader.onloadend = function () {
            base64 = reader.result;
            base64 = base64.replace('data:image/png;base64,', '');
            base64 = base64.replace('data:image/jpeg;base64,', '');
            var url = 'https://m46lnkec4a.execute-api.us-east-2.amazonaws.com/version1';
            var data = {
                imagen: base64,
                extension: file_ext,
                nombre: nombre,
                precio: precio,
                categoria: categoria
            };
        };
    };
    putProduct.prototype.limp = function (response) {
        var nombre = document.getElementById("nombre");
        var precio = document.getElementById("precio");
        var categoria = document.getElementById("categoria");
        var file = document.getElementById("foto");
        precio.value = '';
        nombre.value = '';
        categoria.value = 'Seleccionar una';
        file.value = '';
        return response;
    };
    return putProduct;
}(Conection_1.Conection));
