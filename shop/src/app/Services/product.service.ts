import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  products: any[] = [];
  public userSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('User'));
  isUserConnected$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router:Router) { }


  login(item: any): Observable<any> {
    return this.http.post<any>('https://localhost:7038/api/User/Authenticate', item);
  }
  
  logout() {
    localStorage.removeItem('User');
    this.userSubject.next(false);
  }

/*
  editPassword(item: any): Observable<any> {
    const connectedUserJson = localStorage.getItem('ConnectedUser');
    let id: any;
    if (connectedUserJson) {
      const connectedUser = JSON.parse(connectedUserJson);
      id = connectedUser.id;
    }
  
    return this.http.put(`${this.baseUrl}/UpdatePassword?userId=${id}`, item, {
      responseType: 'json',
    });
  }*/

 
  getAllProducts(): Observable<any> {
    return this.http.get<any>(`https://localhost:7038/api/Product/GetAllProductsById`);
  }

 
  addProduct(product: any, userId:number): Observable<any> {
   
    return this.http.post<any>(`https://localhost:7038/api/Product/AddProduct?UserId=${userId}`, product);
  }

  getProductById(productId:number): Observable<any> {
    return this.http.get(`https://localhost:7038/api/Product/GetProductById?ProductId=${productId}`);
  }
}
