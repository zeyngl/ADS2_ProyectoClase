import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../models/ProductModel';
import { ProductCategoryModel } from '../../models/ProductCategoryModel';
import { ApiService } from '../../services/api.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  categories: any = [];
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

  newProduct(): void{
    alert("click");
    
  }

}
