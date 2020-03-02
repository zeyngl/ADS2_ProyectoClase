import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../models/ProductModel';
import { ProductCategoryModel } from '../../models/ProductCategoryModel';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  categories: any = [
    /*new ProductCategoryModel({ id: 1, name: "Laptops" }),
    new ProductCategoryModel({ id: 2, name: "Smartphones" }),
    new ProductCategoryModel({ id: 3, name: "Cameras" }),
    new ProductCategoryModel({ id: 4, name: "Accesories" }),*/
  ];

  products: any = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getProducts().subscribe(
      (data) => {
        this.products = data;
        console.log("products", data);
      },
      err => console.error(err)
    );

    this.apiService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log("categories", data);
      },
      err => console.error(err)
    );
  }

}
