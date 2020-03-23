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
var registerUser = /** @class */ (function (_super) {
    __extends(registerUser, _super);
    function registerUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    registerUser.prototype.session = function () {
        var logueado = sessionStorage.getItem("user-log");
        if (logueado == "0") {
            sessionStorage.setItem("user-nit", "0");
            sessionStorage.setItem("user-type", "2");
            sessionStorage.setItem("user-name", "nein");
            sessionStorage.setItem("user-log", "0");
        }
        else {
            window.location.href = "index.html";
        }
    };
    registerUser.prototype.getResponse = function (url, methodType, dataType, data) {
        var _this = this;
        var respuesta = "";
        fetch(url, {
            method: methodType,
            query: JSON.stringify(data),
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/" + dataType
            }
        }).then(function (res) { return respuesta = _this.limp(res); })["catch"](function (error) { return respuesta = error; })
            .then(function (response) { return respuesta = _this.limp(response); });
        return respuesta;
    };
    registerUser.prototype.setNewUser = function () {
        var pass = document.getElementById("pass").value;
        var conf = document.getElementById("confpass").value;
        if (pass == conf) {
            var dpi = document.getElementById("dpi").value; //realmente es el nit
            var nombre = document.getElementById("nombre").value;
            var correo = document.getElementById("correo").value;
            var direccion = document.getElementById("direccion").value;
            var fecha = document.getElementById("datenac").value;
            var url = 'http://localhost:4000/registro';
            var data = {
                dpi: dpi,
                nombre: nombre,
                correo: correo,
                pass: pass,
                direccion: direccion,
                fecha: fecha
            };
            var response = this.getResponse(url, "POST", "json", data);
            window.location.href = "index.html";
        }
        else {
            alert("Las contraseñas no coinciden.");
        }
    };
    registerUser.prototype.limp = function (response) {
        alert("Usuario creado");
        var dpi = document.getElementById("dpi").value;
        var nombre = document.getElementById("nombre").value;
        var correo = document.getElementById("correo").value;
        var pass = document.getElementById("pass").value;
        var conf = document.getElementById("confpass").value;
        var direccion = document.getElementById("direccion").value;
        var fecha = document.getElementById("datenac").value;
        dpi.value = '';
        nombre.value = '';
        correo.value = '';
        pass.value = '';
        conf.value = '';
        direccion.value = '';
        fecha.value = '';
        return response;
    };
    return registerUser;
}(Conection_1.Conection));
