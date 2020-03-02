import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URI = `http://localhost:3000/`;

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(`${this.API_URI}products`);
  }

  saveProduct(product) {
    return this.http.post(`${this.API_URI}products`, product);
  }

  getCategories() {
    return this.http.get(`${this.API_URI}products/categories`);
  }

  subscribeCourse(course) {
    return this.http.post(`${this.API_URI}subscribe`, course).toPromise();
  }

  unsubscribeCourse(course) {
    return this.http.delete(`${this.API_URI}subscribe/section`, course).toPromise();
  }

}
