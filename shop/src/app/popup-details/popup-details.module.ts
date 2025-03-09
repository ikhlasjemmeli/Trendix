import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopupDetailsRoutingModule } from './popup-details-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { PopupDetailsComponent } from './popup-details.component';


@NgModule({
  declarations: [
    PopupDetailsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    PopupDetailsRoutingModule
  ]
})
export class PopupDetailsModule { }
