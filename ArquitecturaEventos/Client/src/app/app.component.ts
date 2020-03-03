import { Component } from '@angular/core';
import { JsonService } from './function/json.service';
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private http: HttpClient) { }

  categorias = ["Comestibles", "Limpieza", "Belleza", "Vehiculos"];
  fullElements = [];
  queueElements = [];
  readElements = [];


  updateComponents(): void {
    this.http.get('http://18.234.204.103:3000/producto').subscribe((res: any) => {
      console.log(res);
      this.fullElements = res;
    })
    this.http.get('http://18.234.204.103:3000/QueueRead').subscribe((res: any) => {
      console.log(res);
      this.queueElements = res;
    })
    this.http.get('http://18.234.204.103:4000/producto').subscribe((res: any) => {
      console.log(res);
      this.readElements = res;
    })
  }

  ngOnInit(): void {
    this.updateComponents();
    setInterval(() => {
      this.updateComponents();
    }, 3000);



  }

  users = ['ryan', 'joe', 'Luis'];


  sayHello() {
    alert('Hello');
  }

  deleteUser(user) {
    alert(user + " eliminado");
    user.value = '';
  }
  /*
    addProduct(){
      console.log(producto.value);
      console.log(categoria.value);
      console.log(precio.value);
      producto.value=""    
      precio.value=0
      return false;
    }
  */
  addProduct(producto, categoria, precio) {
    console.log('Enviando datos...');
    this.http.post('http://18.234.204.103:3000/producto', { nombre: producto.value, categoria: categoria.value, precio: precio.value }).toPromise().then(data => {
      console.log(data);
    });
    producto.value="";
    precio.value=0;
    return false;
  }  

}
