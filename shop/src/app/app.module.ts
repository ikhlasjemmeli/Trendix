import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { StoreComponent } from './store/store.component';
import { PopupDetailsComponent } from './popup-details/popup-details.component';
import { ContactComponent } from './contact/contact.component';
import { AboutModule } from './about/about.module';
import { StoreModule } from './store/store.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { ContactModule } from './contact/contact.module';

import { NavbarComponent } from './navbar/navbar.component';

import { AddProductModule } from './add-product/add-product.module';

import { LoginModule } from './login/login.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupDetailsModule } from './popup-details/popup-details.module';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
   NavbarComponent,
   
  
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AboutModule,
    StoreModule,
    HomeModule,
    ContactModule,
  LoginModule,
    AddProductModule,
    PopupDetailsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
