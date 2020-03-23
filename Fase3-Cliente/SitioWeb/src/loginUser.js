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
var loginUser = /** @class */ (function (_super) {
    __extends(loginUser, _super);
    function loginUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    loginUser.prototype.session = function () {
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
    loginUser.prototype.getResponse = function (url, methodType, dataType, data) {
        var respuesta = "";
        fetch(url, {
            method: methodType,
            headers: {
                'Accept': 'application/' + dataType
            }
        }).then(function (res) { return res.json(); })["catch"](function (error) { return respuesta = error; })
            .then(function (response) { return respuesta = JSON.stringify(response); });
        return respuesta;
    };
    loginUser.prototype.Users = function () {
        var correo = document.getElementById('username').value;
        var contra = document.getElementById('password').value;
        var url = "http://localhost:4000/buscarcorreo/?ext=" + correo;
        var response = JSON.parse(this.getResponse(url, "GET", "json", null));
        if (response.length == 0) {
            alert("Usuario no Registrado.");
            return false;
        }
        else {
            var pass = "";
            var tipo = "";
            var nombre = "";
            var nit = "";
            response.forEach(function (element) {
                pass = element.pass;
                tipo = element.tipo;
                nombre = element.nombre;
                nit = element.nit;
            });
            if (contra == pass) {
                sessionStorage.setItem("user-nit", nit);
                sessionStorage.setItem("user-type", tipo);
                sessionStorage.setItem("user-name", nombre);
                sessionStorage.setItem("user-log", "1");
            }
            else {
                alert("Password Incorrecta.");
                return false;
            }
        }
        return true;
    };
    return loginUser;
}(Conection_1.Conection));
