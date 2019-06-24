import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ValidatorFn, AbstractControl, Validators, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { error } from 'util';
import { Console } from '@angular/core/src/console';
import { Observable } from 'rxjs/Observable';
import { ProductService} from '../services/productService'




@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  providers: [ProductService]
})
export class ProductFormComponent implements OnInit {
  nameControl: FormGroup
  httpClient: HttpClient
  url: string
  productService: ProductService;
  product: Product = {
    name: "",
    description: "",
    quantity: 1
  }
  
  

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, p: ProductService) {
    this.httpClient = http;
    this.url = baseUrl
    this.productService = p;
  }

  ngOnInit() {
    this.nameControl = new FormGroup({}), { validators: this.uniqueProductValidator};
   
  } 

  onSubmit(p: Product) {
    this.productService.add(p).subscribe((data: Product) => { }, (error: any) => console.log(error));
    this.productService.products = this.productService.getProducts();
  }

  isProductDup(name: string) : boolean {
    return this.productService.getProduct(name) != null
  }

  uniqueProductValidator(name: string): ValidatorFn  {
    //let name = control.value;
    //if (this.productService.getProduct(name) != null) {
    //  return "DuplicateProduct";
    //}
    //return null;
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isDuplicateProduct = this.isProductDup(control.value);
      return isDuplicateProduct ? {
        'duplicatedProduct': {
          value: control.value
        }
      } : null;
      };
  }

  

  add(p :Product) : Observable<Product> {
    let u = this.url + 'api/Product'
    return this.httpClient.post<Product>(u, p, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
    // .pipe(catchError(this.handleError));
  }

  
}

export const identityRevealedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const name = control.get('name');
  const alterEgo = control.get('alterEgo');

  return name && alterEgo && name.value === alterEgo.value ? { 'identityRevealed': true } : null;
};

export class Product {
  name: string;
  description: string;
  quantity: number;
}

