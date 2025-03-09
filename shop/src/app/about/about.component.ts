import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { ProductService } from '../Services/product.service';
export const countUpAnimation = trigger('countUp', [
  state('inactive', style({ opacity: 0 })),
  state('active', style({ opacity: 1 })),
  transition('inactive => active', [
    animate('1s', style({ opacity: 1 }))
  ])
]);
export const fadeInOutAnimation = trigger('fadeInOut', [
  state('void', style({ opacity: 0, transform: 'scale(0.9)' })),
  transition(':enter', [
    animate('1000ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
  ]),
]);
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  
  animations: [
    
    countUpAnimation,fadeInOutAnimation
   
  ]

})

export class AboutComponent {
  numbers: Stats = {
    brands: 7,
    products: 140,
    experience: 10,
    clients: 100
  };

  stats: Stats = {
    brands: 0,
    products: 120,
    experience: 0,
    clients: 85
  };

  isVisible = false;
  categories: cat[] = [
    { image: '../../assets/costum.jpg', name: 'Suits & Blazers' },
    { image: '../../assets/robe.jpg', name: 'Dresses' },
    { image: '../../assets/shoes.jpg', name: 'Shoes' },
    { image: '../../assets/sac.jpg', name: 'Bags & Handbags' },
    { image: '../../assets/acc.jpg', name: 'Accessories' },
    { image: '../../assets/parfum.jpg', name: 'Perfumes' },
    { image: '../../assets/maquillage.jpg', name: 'Makeup' },
    { image: '../../assets/lunette.jpg', name: 'Sunglasses' }
  ];
  

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const element = document.getElementById('stats');
    if (element) {
      const position = element.getBoundingClientRect();
      if (position.top <= window.innerHeight && position.bottom >= 0) {
        this.isVisible = true;
        this.startCounting();
      }
    }
  }

  animationState: 'void' | 'enter' = 'void';
constructor(private prodService:ProductService){}

  ngOnInit() {
   
    this.isVisible = false;
    setTimeout(() => {
      this.animationState = 'enter';
    }, 1000); // Changez le délai comme nécessaire
  }

  startCounting() {
    if (!this.isVisible) return;

    Object.keys(this.numbers).forEach(key => {
      const countKey = key as keyof Stats;
      let count = this.stats[countKey];;
      const target = this.numbers[countKey];
      const interval = setInterval(() => {
        if (count < target) {
          count++;
          this.stats[countKey] = count;
        } else {
          clearInterval(interval);
        }
      }, 100);
    });
  }


}
interface Stats {
  brands: number;
  products: number;
  experience: number;
  clients: number;
}
interface cat {
  image: string;
  name: string;
  
}