import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InputUserDataFormComponent } from './components/input-user-data-form/input-user-data-form.component';
import { DisplayUserDataComponent } from './components/display-user-data/display-user-data.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopFooterComponent } from './components/top-footer/top-footer.component';
import { BottomFooterComponent } from './components/bottom-footer/bottom-footer.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductComponent } from './components/product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    ProductListComponent,
    InputUserDataFormComponent,
    DisplayUserDataComponent,
    TopHeaderComponent,
    MainHeaderComponent,
    NavigationComponent,
    HeaderComponent,
    TopFooterComponent,
    BottomFooterComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }