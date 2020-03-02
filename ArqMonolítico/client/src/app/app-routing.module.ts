import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'product', component: ProductComponent },
  { path: 'product/:id', component: ProductComponent},
  { path: 'product-list', component: ProductListComponent },
  { path: '', redirectTo: '/product-list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, 
      //{enableTracing: true}
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }