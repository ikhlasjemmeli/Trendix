import { Component } from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';

export const fadeInOutAnimation = trigger('fadeInOut', [
  state('void', style({ opacity: 0, transform: 'scale(0.9)' })),
  transition(':enter', [
    animate('1000ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
  ]),
]);

export const staggerAnimation = trigger('staggerAnimation', [
  transition('* => *', [
    query('@fadeInOut', stagger(300, animate(1000)))
  ])
]);

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [fadeInOutAnimation, staggerAnimation]
})
export class ContactComponent {
  contactInfos: contact[] = [
    { icon: 'fa-brands fa-facebook', title: 'Facebook', text: 'Abrasif Italia Klindex', link: 'https://www.facebook.com/people/Abrasif-Italia-Klindex/100057219229918/' },
    { icon: 'fa-brands fa-square-instagram', title: 'Instagram', text: 'Abrasif Italia Klindex', link: 'https://www.instagram.com/abrasif_italia_klindex/' },
    { icon: 'fa-solid fa-envelope', title: 'Email', text: 'abrasif.italia3@gmail.com', link: 'mailto:abrasif.italia3@gmail.com' },
];

  openMap(address: string): void {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(url, '_blank', 'width=800,height=600');
  }
}

export interface contact {
  icon: string;
  title: string;
  text: string;
  link: string;
}
