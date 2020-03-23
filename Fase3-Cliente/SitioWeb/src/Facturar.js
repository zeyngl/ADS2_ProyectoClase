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
var Facturar = /** @class */ (function (_super) {
    __extends(Facturar, _super);
    function Facturar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Facturar.prototype.session = function () {
        var nitsuccess = sessionStorage.getItem("user-nit");
        if (nitsuccess == null) {
            window.location.href = "login.html";
        }
        var nit = document.getElementById("nit");
        nit.value = nitsuccess;
    };
    Facturar.prototype.getResponse = function (url, methodType, dataType, data) {
        var respuesta = "";
        $.ajax({ url: url,
            type: methodType,
            dataType: dataType,
            data: data,
            async: false,
            success: function (response) {
                respuesta = JSON.stringify(response);
            }
        });
        return respuesta;
    };
    Facturar.prototype.addProducts = function () {
        var f = new Date();
        var date = f.getFullYear() + "" + (f.getMonth() + 1) + "" + f.getDate(); //YYYYMDD
        var nit = document.getElementById("nit").value;
        var url = 'http://ec2-54-89-91-178.compute-1.amazonaws.com:3000/factura';
        var datos = {
            registro: JSON.stringify({
                fecha: +date,
                nit: nit
            })
        };
        var response = this.getResponse(url, "POST", "json", datos); //mandamos la peticion REST
        var toJSON = JSON.parse(response);
        var tbody = document.getElementById('tbody');
        var inputTotal = document.getElementById("total");
        var total = 0.0;
        var HTML = "";
        toJSON.forEach(function (element) {
            HTML += "<tr><td>" + element.categoria
                + "</td><td>" + element.nombre +
                "</td><td>" + element.precio + "</td></tr>\n";
            total = total + parseFloat(element.precio);
        });
        tbody.innerHTML = HTML;
        inputTotal.value = total.toString();
    };
    Facturar.prototype.facturar = function () {
        var jsPDF = require('jspdf');
        var doc = new jsPDF();
        var nit = document.getElementById("nit").value;
        var total = document.getElementById("total").value;
        var elementHTML = "<h3>Nit Cliente: " + nit + "</h3>\n" +
            "<h3>Total: " + total + "</h3><br><br><br>\n" + $('#divfactura').html();
        var specialElementHandlers = {
            '#elementH': function (element, renderer) {
                return true;
            }
        };
        doc.fromHTML(elementHTML, 15, 15, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        });
        doc.save('factura.pdf');
    };
    return Facturar;
}(Conection_1.Conection));
