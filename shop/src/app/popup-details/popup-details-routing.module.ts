import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopupDetailsComponent } from './popup-details.component';

const routes: Routes = [

 { path: 'magasin/:filter/:name/:page', component: PopupDetailsComponent },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PopupDetailsRoutingModule { }
