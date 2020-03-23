import { Conection } from "./Conection";

class putProduct extends Conection {
    
    session(): void {
        var nitsuccess = sessionStorage.getItem("user-nit");
        var typesuccess = sessionStorage.getItem("user-type");

        if(nitsuccess == null){
            window.location.href = "login.html";
        }
        
        if(typesuccess != "0"){
            window.location.href = "index.html";
        }
    }


    getResponse(url: string, methodType: string, dataType: string, data: object): string {
        var respuesta:string = "";

        fetch(url, {
        method: methodType,
        body: JSON.stringify(data),
        headers:{
            "Content-Type" : "application/"+dataType  
        }
        }).then(res => res.json())
        .catch(error => respuesta = error )
        .then(response => respuesta = this.limp(response));

        return respuesta;
    }


    setNewProduct(): void {
        var nombre:string = (document.getElementById("nombre") as HTMLInputElement).value;
        var precio:string = (document.getElementById("precio") as HTMLInputElement).value;
        var categoria:string = (document.getElementById("categoria") as HTMLInputElement).value;
        var file = (document.getElementById("foto") as HTMLInputElement).files[0];
        var file_name:string = (document.getElementById("foto") as HTMLInputElement).files[0].name;
        var file_ext:string = (file_name.substring(file_name.lastIndexOf("."))).toLowerCase().replace(".","");

        var base64;
        var reader:FileReader = new FileReader();

        if(file){
            reader.readAsDataURL(file);
        }

        reader.onloadend = function(){
            base64 = reader.result;
            base64 = base64.replace('data:image/png;base64,','');
            base64 = base64.replace('data:image/jpeg;base64,','');

            var url = 'https://m46lnkec4a.execute-api.us-east-2.amazonaws.com/version1';

            var data = {
                imagen: base64,
                extension: file_ext,
                nombre: nombre,
                precio: precio,
                categoria: categoria
            };

            
        };
    }


    limp(response:string): string {
        var nombre = (document.getElementById("nombre") as HTMLInputElement);
        var precio = (document.getElementById("precio") as HTMLInputElement);
        var categoria = (document.getElementById("categoria") as HTMLInputElement);
        var file = (document.getElementById("foto") as HTMLInputElement);
      
        precio.value='';
        nombre.value='';
        categoria.value='Seleccionar una';
        file.value='';
      
        return response;
    }

}