import { Conection } from "./Conection";
import { addProduct } from "./addProduct";

class Facturar extends Conection implements addProduct{

    session(): void {
        var nitsuccess = sessionStorage.getItem("user-nit");
        if(nitsuccess == null){
            window.location.href = "login.html";
        }

        var nit:HTMLInputElement = (document.getElementById("nit") as HTMLInputElement);
        nit.value = nitsuccess;
    }


    getResponse(url: string, methodType: string, dataType: string, data: object): string {
        var respuesta:string = "";

        $.ajax({url,
            type: methodType,
            dataType: dataType,
            data: data,
            async: false,
            success: function(response){
                respuesta = JSON.stringify(response);
            }
        });

        return respuesta;
    }


    addProducts(): void {
        var f:Date = new Date();
        var date:string = f.getFullYear() +""+ (f.getMonth() +1) +""+ f.getDate();//YYYYMDD
        var nit:string = (document.getElementById("nit") as HTMLInputElement).value;

        var url:string = 'http://ec2-54-89-91-178.compute-1.amazonaws.com:3000/factura';

        var datos = {
            registro: JSON.stringify({
                fecha: +date,
                nit: nit,
            })
        };

        var response:string = this.getResponse(url, "POST", "json", datos);//mandamos la peticion REST

        var toJSON = JSON.parse(response);
        var tbody = document.getElementById('tbody');
        var inputTotal:HTMLInputElement = (document.getElementById("total") as HTMLInputElement);
        var total:number = 0.0;
        var HTML = "";

        toJSON.forEach(function(element) {
            HTML += "<tr><td>"+element.categoria
            +"</td><td>"+element.nombre+
            "</td><td>"+element.precio+"</td></tr>\n";

            total = total + parseFloat(element.precio);
        });

        tbody.innerHTML = HTML;
        inputTotal.value = total.toString();
    }


    facturar(): void {
        var jsPDF = require('jspdf');

        var doc = new jsPDF();
        var nit:string = (document.getElementById("nit") as HTMLInputElement).value;
        var total:string = (document.getElementById("total") as HTMLInputElement).value;
        
        var elementHTML:string  = "<h3>Nit Cliente: "+nit+"</h3>\n"+
        "<h3>Total: "+total+"</h3><br><br><br>\n"+ $('#divfactura').html();
    
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
    }

}