import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PopupDetailsComponent } from './popup-details/popup-details.component';
import { StoreComponent } from './store/store.component';
import { AuthGuard } from './Guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  
  
  { 
    path: 'a propos de nous',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  { 
    path: 'Add',
    loadChildren: () => import('./add-product/add-product.module').then(m => m.AddProductModule),
    canActivate: [AuthGuard] 
  },
  { 
    path: 'Contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
  },
  { 
    path: 'Login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },


{ path: 'magasin/:filter', component: StoreComponent },  
{ path: 'magasin/:filter/:page', component: StoreComponent },

  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
