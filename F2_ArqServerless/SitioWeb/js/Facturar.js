function obtener(){
    var url = '';

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
    inputTotal.value = total.toString();

    return '200';
}



function facturar(){
    var doc = new jsPDF();

    var nombre = document.getElementById("nombre").value;
    var total = document.getElementById("total").value;
    
    var elementHTML = "<h3>Cliente: "+nombre+"</h3>\n"+
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