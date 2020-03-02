import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/ProductModel';
import { ProductCategoryModel } from 'src/app/models/ProductCategoryModel';
import { FormBuilder, FormGroup, FormControl, Validators, } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  registered = false;
  submitted = false;
  productForm: FormGroup;

  product: any;
  categories: any = [];

  params: any;
  product_id = '';
  u: any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      unit_price: ['', Validators.required],
    });

    this.params = this.activatedRoute.snapshot.params;
    this.product_id = this.params.id;
    if (this.product_id) {
      this.apiService.getProduct(this.product_id).subscribe(
        (data) => {
          this.product = data[0];
          console.log("product", this.product);
        },
        err => console.error(err)
      );
    } else {
      this.product = {};
    }

    this.apiService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log("categories", data);
      },
      err => console.error(err)
    );
  }

  invalidName() {
    return (this.submitted && this.productForm.controls.name.errors != null);
  }

  invalidUnitPrice() {
    return (this.submitted && this.productForm.controls.unit_price.errors != null);
  }

  onSubmit() {
    this.submitted = true;

    if (this.productForm.invalid == true) {
      return;
    }
    else {
      this.product.categ_id = Number(this.product.categ_id) || null;
      if (Number(this.product.id)) {
        this.apiService.createProduct(this.product).subscribe(
          (data) => {
            console.log("saved", data);
            alert("saved");
          },
          err => console.error(err)
        );
      }else{
        this.apiService.saveProduct(this.product).subscribe(
          (data) => {
            console.log("created", data);
            alert("created");
          },
          err => console.error(err)
        );
      }
      this.registered = true;
    }
  }
}