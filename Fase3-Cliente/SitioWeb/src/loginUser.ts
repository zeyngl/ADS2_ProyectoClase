import { Conection } from "./Conection";

class loginUser extends Conection{

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
        headers:{
            'Accept': 'application/'+dataType
        }
        }).then(res => res.json())
        .catch(error => respuesta = error)
        .then(response => respuesta = JSON.stringify(response));

        return respuesta;
    }


    Users(): boolean {
        var correo:string = (document.getElementById('username') as HTMLInputElement).value;
        var contra:string = (document.getElementById('password') as HTMLInputElement).value;

        var url:string ="http://localhost:4000/buscarcorreo/?ext="+correo;

        var response = JSON.parse(this.getResponse(url, "GET", "json", null));

        if(response.length==0){

            alert("Usuario no Registrado.");
            return false;
        }else{

            var pass:string = "";
            var tipo:string = "";
            var nombre:string = "";
            var nit:string = "";

            response.forEach(function(element) {
                pass = element.pass;
                tipo = element.tipo;
                nombre = element.nombre;
                nit  = element.nit;
            });

            if (contra == pass){
                sessionStorage.setItem("user-nit",nit);
                sessionStorage.setItem("user-type",tipo);
                sessionStorage.setItem("user-name",nombre);
                sessionStorage.setItem("user-log", "1");
            }else{
              alert("Password Incorrecta.");
              return false;
            }
        
        }

        return true;
    }

}