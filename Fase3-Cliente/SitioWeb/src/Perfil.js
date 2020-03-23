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
var Perfil = /** @class */ (function (_super) {
    __extends(Perfil, _super);
    function Perfil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Perfil.prototype.session = function () {
        var nitsuccess = sessionStorage.getItem("user-nit");
        var namesuccess = sessionStorage.getItem("user-name");
        if (nitsuccess == null) {
            window.location.href = "login.html";
        }
        var nit = document.getElementById("nit");
        nit.value = nitsuccess;
        var name = document.getElementById("nombre");
        name.value = namesuccess;
    };
    Perfil.prototype.getResponse = function (url, methodType, dataType, data) {
        var respuesta = "";
        fetch(url, {
            method: methodType,
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/' + dataType
            }
        }).then(function (res) { return res.json(); })["catch"](function (error) { return respuesta = JSON.stringify(error); })
            .then(function (response) { return respuesta = JSON.stringify(response); });
        return respuesta;
    };
    Perfil.prototype.change_data = function () {
        var nit = document.getElementById("nit").value;
        var name = document.getElementById("nombre").value;
        var contra_act = document.getElementById("contra").value;
        var contra_new = document.getElementById("contra-nueva").value;
        if (name == "") {
            name = sessionStorage.getItem("user-name");
        }
        var cambiar_contra = true;
        if (contra_act == "" || contra_new == "") {
            cambiar_contra = false;
        }
        var data;
        if (cambiar_contra) {
            data = {
                cambioc: true,
                nit: nit,
                nombre: name,
                contraAct: contra_act,
                contraNew: contra_new
            };
        }
        else {
            data = {
                cambioc: false,
                nit: nit,
                nombre: name
            };
        }
        var url = 'falta especificar la url';
        var response = this.getResponse(url, "POST", "json", data);
        alert(response);
    };
    return Perfil;
}(Conection_1.Conection));
