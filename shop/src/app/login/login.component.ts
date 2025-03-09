import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../Services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!:FormGroup;
  
constructor(private formbuilder : FormBuilder, private authService :ProductService,  private router:Router){
  this.loginForm = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  }, { updateOn: 'change' });
  
}
  Login(): void {
    if (!this.loginForm.valid) {
      return;
    }
  
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        if (response.token && response.connectedUser) {
          localStorage.clear();
          localStorage.setItem('Token', response.token);
          localStorage.setItem('User', JSON.stringify(response.connectedUser));
          this.authService.userSubject.next(true);
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error("Erreur de connexion :", err);
      }
    });
    
  }
}
