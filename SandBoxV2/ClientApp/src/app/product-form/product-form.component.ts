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

  isDup: boolean = false
  submittedProduct: Product

  constructor(private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private productService: ProductService,
    private toastrService: ToastrService) {
  }

  ngOnInit() {
  }

  onSubmit(submittedProduct: Product) {

    this.productService.addIfNotDuplicate(submittedProduct.name, submittedProduct).then((product) => {
      if (product != null) {
        this.toastrService.warning("Product name " + product.name + " is already in the system, please chose another name");
      }
      else {
        this.toastrService.success("Product added");
      }
    }, (error) => {
      console.log(error);
    });

  }


}

