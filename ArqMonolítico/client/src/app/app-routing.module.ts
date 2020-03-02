import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'product/:id',
    component: ProductComponent
  },
  {
    path: 'product-list',
    component: ProductListComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }