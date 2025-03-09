import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../store/store.component';
import { ProductService } from '../Services/product.service';


@Component({
  selector: 'app-popup-details',
  templateUrl: './popup-details.component.html',
  styleUrls: ['./popup-details.component.scss']
})
export class PopupDetailsComponent  implements OnInit{
  isUserConnected: boolean = false;
  Product:any;
  isMenuOpen = false;
  currentPageForModal:number=1;
  productName: string | null = '';
  modalImage: Product | null = null;
 
 @Input() products: Product[] = [];
  constructor(private route: ActivatedRoute,private router: Router, private prodService : ProductService) {}

  ngOnInit(): void {
    this.prodService.isUserConnected$.subscribe(isConnected => {
      this.isUserConnected = isConnected;
    });
   
    this.route.paramMap.subscribe(params => {
   
      const id = params.get('name');
      
     
      if (id ) {
        this.prodService.getProductById(parseInt( id)).subscribe(
          (product) => {
            this.Product= product;
           
          },
          (error) => {
            console.error("Erreur lors de la récupération du produit :", error);
          }
        );
       
      }
    });
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
   
  }
  isExpanded = false;

    toggleDescription() {
        this.isExpanded = !this.isExpanded;
    }

 
  @Output() close = new EventEmitter<void>();

  closeModal() {
    
    this.close.emit();
    const currentUrl = this.router.url; 
  const urlSegments = currentUrl.split('/');

  
  const filter = urlSegments[2]; 
  //const filter2 = urlSegments[3]; 
  const page = urlSegments[4];
 if (filter){
  
  this.router.navigate([`/magasin/${filter}/${page}`]);
 
 }
}
}
