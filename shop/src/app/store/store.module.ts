import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { PopupDetailsComponent } from '../popup-details/popup-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    StoreComponent,
  // PopupDetailsComponent,
   
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    NgxPaginationModule,
    HttpClientModule
  ],
  exports: [
    StoreComponent
  ]
})
export class StoreModule { }
