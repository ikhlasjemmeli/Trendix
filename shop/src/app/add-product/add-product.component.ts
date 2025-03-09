import { Component } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
    AddForm!:FormGroup;

  constructor(private productService: ProductService,private formbuilder : FormBuilder) {
    this.AddForm = this.formbuilder.group({
        title: ['', Validators.required],
        price: ['', Validators.required],
        category: ['', Validators.required],
        imageUrL: ['', Validators.required],
        description: ['', Validators.required],
      }, { updateOn: 'change' });
  }

  AddProduct() {
    const connectedUserJson = localStorage.getItem('User');
    let id: any;
    if (connectedUserJson) {
      const connectedUser = JSON.parse(connectedUserJson);
      id = connectedUser.id;
    }
    this.productService.addProduct(this.AddForm.value,id).subscribe({
      next: response => {
        console.log('Produit ajouté:', response);
        this.productService.products.push(response)
      }
    });
  }
}
