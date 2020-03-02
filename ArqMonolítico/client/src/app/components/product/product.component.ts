import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/ProductModel';
import { ProductCategoryModel } from 'src/app/models/ProductCategoryModel';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: ProductModel = new ProductModel({ 
    id: 1, name: "Laptop", unit_price: 10.99, categ_id: ProductCategoryModel 
  });

  constructor() { }

  ngOnInit(): void {
  }

}