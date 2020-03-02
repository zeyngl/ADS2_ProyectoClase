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
  getProduct(product_id) {
    return this.http.get(`${this.API_URI}products/${product_id}`);
  }

  saveProduct(product) {
    return this.http.post(`${this.API_URI}products`, product);
  }

  createProduct(product) {
    return this.http.put(`${this.API_URI}products`, product);
  }

  getCategories() {
    return this.http.get(`${this.API_URI}product_categories`);
  }

  subscribeCourse(course) {
    return this.http.post(`${this.API_URI}subscribe`, course).toPromise();
  }

  unsubscribeCourse(course) {
    return this.http.delete(`${this.API_URI}subscribe/section`, course).toPromise();
  }

}
