import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../Services/product.service';

export const fadeInOutAnimation = trigger('fadeInOut', [
  state('void', style({ opacity: 0, transform: 'scale(0.9)' })),
  transition(':enter', [
    animate('1000ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
  ]),
]);
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  animations: [fadeInOutAnimation]
})

export class StoreComponent {
  page: number =1;
  currentPageForModal :number =1;
  itemsPerPage: number = 8;
  products = this.prodService.products


  filteredProducts = this.products;
  isModalOpen = false;
  filter: string ='';

  constructor(private route: ActivatedRoute,private router: Router, private prodService:ProductService) {}

  getAllProducts(): void {
    
    this.prodService.getAllProducts().subscribe(
      data => {
        this.products = data;
        this.applyFilters();
        console.log(this.products);
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }
ngOnInit(): void {
  this.getAllProducts();
 
  this.route.paramMap.subscribe(params => {
    this.filter = params.get('filter') || "";
   
    const pageParam = params.get('page');
    this.page = pageParam ? parseInt(pageParam, 10) : 1;
    console.log(pageParam)
    this.applyFilters();  
    console.log('filtred',this.filteredProducts)
  });
  
  this.route.queryParams.subscribe(params => {
    const pageParam = params['page'];
    if (pageParam) {
      this.page = +pageParam; 
    }
  });
  
  
  this.loadProducts();
  this.route.paramMap.subscribe(params => {
    const name = params.get('name');
    
    if (name) {
     
      this.isModalOpen = true;
    }
  });
}


loadProducts(): void {
 
  this.applyFilters();  
}

applyFilters(): void {
  this.filteredProducts = this.products;

  
   if (this.filter ) {
   
    this.filteredProducts = this.filteredProducts.filter(product => 
       product.category.includes(this.filter)
    );
  
  }
  

}


 

activeFilter: string = ''; 

filterProducts(filter: string): void {
  this.activeFilter = filter;
  if (this.activeFilter === 'all') {
      this.filteredProducts = this.products;
     } else {
       this.filteredProducts = this.products.filter(product => product.category.includes(this.activeFilter));
     }
     this.page = 1;
}

isActive(filter: string): boolean {
  return this.activeFilter === filter;
}

  openModal(productId:number,page:number) {
    const connectedUserJson = localStorage.getItem('User');
    let id: any;
    if (connectedUserJson) {
      const connectedUser = JSON.parse(connectedUserJson);
      id = connectedUser.id;
    }
   const filter1Value = this.filter || ''; 
   this.prodService.getProductById(productId).subscribe(
    (product) => {
      console.log(product); 
      const newUrl1 = `/magasin/${filter1Value}/${product.id}/${this.page}`;
      console.log(newUrl1); 
      this.router.navigate([newUrl1]);
    },
    (error) => {
      console.error("Erreur lors de la récupération du produit :", error);
    }
  );
  
 
   
  this.isModalOpen = true;

      
  }

  closeModal() {
    this.isModalOpen = false;
    const filter1Value = this.filter || ''; 
    const newUrl = `/magasin/${filter1Value} `
    this.router.navigate([newUrl])
   
  }
}

export interface Product{
  src:string,
  name:string,
  description : string,
  category: string,
  marque:string,
  souscategory:string,
  madeintunisia:string,
  facebook:string;
  
}

