
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  constructor(private authService:ProductService){}
 
  //isMenuOpen = false;
  isUserConnected: boolean = false;
  isMenuOpen = false;
  isMagasinMenuOpen = false;
  // New state variables for mobile submenus
  isSubMenuOpen1 = false;
  isSubMenuOpen2 = false;
  isSubMenuOpen3 = false;
  isSubMenuOpen4 = false;
  isSubMenuOpen5 = false;

  ngOnInit(): void {
    this.authService.isUserConnected$.subscribe(isConnected => {
      this.isUserConnected = isConnected;
    });
  }
  logout() {
    this.authService.logout();
  }
  toggleSubMenu(index: number) {
    switch (index) {
      case 1:
        this.isSubMenuOpen1 = !this.isSubMenuOpen1;
        break;
      case 2:
        this.isSubMenuOpen2 = !this.isSubMenuOpen2;
        break;
      case 3:
        this.isSubMenuOpen3 = !this.isSubMenuOpen3;
        break;
      case 4:
        this.isSubMenuOpen4 = !this.isSubMenuOpen4;
        break;
      case 5:
          this.isSubMenuOpen5 = !this.isSubMenuOpen5;
        break;
    }
  }
 

  toggleMagasinMenu() {
    this.isMagasinMenuOpen = !this.isMagasinMenuOpen;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
  }

  isOptionsOpen = false;
  isOptionsOpen2 = false;
  isOptionsOpen3 = false;
  isOptionsOpen4 = false;
  isOptionsOpen5 = false;
  toggleOptions(isOptionsOpen :boolean) {
    this.isOptionsOpen = !this.isOptionsOpen;
  }

  closeOptions(isOptionsOpen :string) {
    this.isOptionsOpen = false;
    this.isOptionsOpen2 = false;
    this.isOptionsOpen3 = false;
    this.isOptionsOpen4 = false;
    this.isOptionsOpen5 = false;
   
  }
 
}
