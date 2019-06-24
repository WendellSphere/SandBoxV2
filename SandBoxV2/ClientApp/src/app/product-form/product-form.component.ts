import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, ValidatorFn, AbstractControl, Validators, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { error } from 'util';
import { Console } from '@angular/core/src/console';
import { Observable } from 'rxjs/Observable';
import { ProductService } from '../services/productService'
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operator/first';
import { filter } from 'rxjs/operator/filter';
import { Product } from '../models/Product';




@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  providers: [ProductService]
})
export class ProductFormComponent implements OnInit {
  nameControlGroup: FormGroup

  product: Product = {
    name: null,
    description: null,
    quantity: null
  }

  addProduct: Product[] = []

  constructor(private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private productService: ProductService,
    private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.productService.products = this.productService.getProducts();
  }

  onSubmit(p: Product) {
    this.productService.products = this.productService.getProducts();
    if (!p.name) {
      this.toastrService.warning("please enter a product name before submiting");
    }
    else if (this.productService.products.filter(p2 => p2.name == p.name).length > 0) {
      this.toastrService.warning("Product name " + p.name + " is already in the system, please chose another name");
    }
    else {
      this.productService.add(p).subscribe((data: Product) => { this.toastrService.success("Product added"); }, (error: any) => console.log(error));
      this.productService.products = this.productService.getProducts();
    }
  }

  isProductDup(name: string): boolean {
    let p = this.productService.getProduct(name); 

    return (p != null && p.name != null);
  }

  add(p: Product): Observable<Product> {
    let u = this.baseUrl + 'api/Product'
    return this.httpClient.post<Product>(u, p, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
   
  }


}

