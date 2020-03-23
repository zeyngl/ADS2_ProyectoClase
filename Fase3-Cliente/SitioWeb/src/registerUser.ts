import { Conection } from "./Conection";
import { Cleaner } from "./Cleaner";

class registerUser extends Conection implements Cleaner {
    
    session(): void {
        var logueado:string = sessionStorage.getItem("user-log");
        if(logueado == "0"){
            sessionStorage.setItem("user-nit","0");
            sessionStorage.setItem("user-type","2");
            sessionStorage.setItem("user-name","nein");
            sessionStorage.setItem("user-log", "0");
        }else{
            window.location.href = "index.html";
        }
    }


    getResponse(url: string, methodType: string, dataType: string, data: object): string {
        var respuesta:string = "";

        fetch(url, {
        method: methodType,
        query: JSON.stringify(data),
        body: JSON.stringify(data),
        headers:{
            "Content-Type" : "application/"+dataType  
        }
        }).then(res => respuesta = this.limp(res))
        .catch(error => respuesta = error)
        .then(response => respuesta = this.limp(response));

        return respuesta;
    }


    setNewUser(){
        var pass:string = (document.getElementById("pass") as HTMLInputElement).value;
        var conf:string = (document.getElementById("confpass") as HTMLInputElement).value;
      
        if(pass == conf){
            var dpi:string = (document.getElementById("dpi") as HTMLInputElement).value;//realmente es el nit
            var nombre:string = (document.getElementById("nombre") as HTMLInputElement).value;
            var correo:string = (document.getElementById("correo") as HTMLInputElement).value;
            var direccion:string = (document.getElementById("direccion") as HTMLInputElement).value;
            var fecha:string = (document.getElementById("datenac") as HTMLInputElement).value;

            var url = 'http://localhost:4000/registro';

            var data = {
                dpi: dpi,
                nombre: nombre,
                correo: correo,
                pass: pass,
                direccion: direccion,
                fecha: fecha
            };

            var response:string = this.getResponse(url, "POST", "json", data);
            window.location.href = "index.html";
        }else{
          alert("Las contraseñas no coinciden.");
        }
    }


    limp(response: string): string {
        alert("Usuario creado");
        let dpi = document.getElementById("dpi").value;
        let nombre = document.getElementById("nombre").value;
        let correo = document.getElementById("correo").value;
        let pass = document.getElementById("pass").value;
        let conf = document.getElementById("confpass").value;
        let direccion = document.getElementById("direccion").value;
        let fecha = document.getElementById("datenac").value;
        dpi.value='';
        nombre.value='';
        correo.value='';
        pass.value='';
        conf.value='';
        direccion.value='';
        fecha.value='';

        return response;
    }

}