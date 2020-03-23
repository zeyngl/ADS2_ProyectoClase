import { Conection } from "./Conection";

class Perfil extends Conection {

    session(): void {
        var nitsuccess = sessionStorage.getItem("user-nit");
        var namesuccess = sessionStorage.getItem("user-name");

        if(nitsuccess == null){
            window.location.href = "login.html";
        }

        var nit:HTMLInputElement = (document.getElementById("nit") as HTMLInputElement);
        nit.value = nitsuccess;

        var name:HTMLInputElement = (document.getElementById("nombre") as HTMLInputElement);
        name.value = namesuccess;
    }


    getResponse(url: string, methodType: string, dataType: string, data: object): string {
        var respuesta:string = "";

        fetch(url, {
        method: methodType,
        body: JSON.stringify(data),
        headers:{
            'Accept': 'application/'+dataType
        }
        }).then(res => res.json())
        .catch(error => respuesta = JSON.stringify(error))
        .then(response => respuesta = JSON.stringify(response));

        return respuesta;
    }


    change_data(): void {
        var nit:string = (document.getElementById("nit") as HTMLInputElement).value;
        var name:string = (document.getElementById("nombre") as HTMLInputElement).value;
        var contra_act:string = (document.getElementById("contra") as HTMLInputElement).value;
        var contra_new:string = (document.getElementById("contra-nueva") as HTMLInputElement).value;
    
        if(name==""){
            name = sessionStorage.getItem("user-name");
        }
    
        var cambiar_contra = true;
        if(contra_act=="" || contra_new==""){
            cambiar_contra = false;
        }
    
        var data:object;
        if(cambiar_contra){
            data={
                cambioc: true,
                nit: nit,
                nombre: name,
                contraAct: contra_act,
                contraNew: contra_new
            };
        }else{
            data={
                cambioc: false,
                nit: nit,
                nombre: name
            };
        }
    
        var url = 'falta especificar la url';

        var response = this.getResponse(url, "POST", "json", data);

        alert(response);
    }

}