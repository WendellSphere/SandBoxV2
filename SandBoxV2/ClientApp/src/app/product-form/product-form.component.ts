import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, ValidatorFn, AbstractControl, Validators, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductService } from '../services/productService'
import { ToastrService } from 'ngx-toastr';
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

    if (submittedProduct == null || submittedProduct.name == null || submittedProduct.quantity == null) {
      this.toastrService.warning("Invalid Input, please enter a product name and quantity");
    }
    else {
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


}

