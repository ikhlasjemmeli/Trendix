import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store.component';
import { PopupDetailsComponent } from '../popup-details/popup-details.component';

const routes: Routes = [
  {path: '', component:StoreComponent},
 
 { path: 'magasin/:filter/:filter2/:name/:page', component: PopupDetailsComponent },
 { path: 'magasin/:filtermarque/:name/:page', component: PopupDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
