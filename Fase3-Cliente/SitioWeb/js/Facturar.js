function session(){
    var sucess = sessionStorage.getItem("user-nit");
    if(sucess == null){
        window.location.href = "login.html";
    }

    var nit = document.getElementById("nit");
    nit.value = sucess;
}


function obtener(){
    //session();

    var f = new Date();
    var date = f.getFullYear() +""+ (f.getMonth() +1) +""+ f.getDate();//YYYYMMDD

    var nit = document.getElementById("nit").value;

    var datos = {
        registro: JSON.stringify({
            fecha: parseInt(date,"10"),
            nit: nit,
        })
    };

    var url = 'http://ec2-54-89-91-178.compute-1.amazonaws.com:3000/factura';

    $.ajax({url,
        type:'POST',
        dataType:'json',
        data: datos,
        async: false,
        success: function(response){
            alert(JSON.stringify(response));
            addProducts(response);
        }
    });
}


function addProducts(data){
    var toJSON = JSON.parse(JSON.stringify(data));
    var tbody = document.getElementById('tbody');
    var inputTotal = document.getElementById("total");

    var total = 0.0;
    var HTML = "";

    toJSON.forEach(function(element) {
        HTML += "<tr><td>"+element.categoria
        +"</td><td>"+element.nombre+
        "</td><td>"+element.precio+"</td></tr>\n";

        total = total + parseFloat(element.precio);
    });

    tbody.innerHTML = HTML;
    inputTotal.value = total;

    return '200';
}


function facturar(){
    var doc = new jsPDF();

    var nit = document.getElementById("nit").value;
    var total = document.getElementById("total").value;
    
    var elementHTML = "<h3>Nit Cliente: "+nit+"</h3>\n"+
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