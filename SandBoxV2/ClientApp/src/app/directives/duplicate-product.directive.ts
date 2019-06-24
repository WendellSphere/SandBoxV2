//import { Directive, Input } from "@angular/core";
//import { Validator, AbstractControl, NG_VALIDATORS, ValidatorFn } from "@angular/forms";
//import { ProductService, Product } from "../services/productService";

//@Directive({
//  selector: '[productDuplicate]',
//  providers: [{ provide: NG_VALIDATORS, useExisting: DuplicateProductDirective, multi: true }]
//})
//export class DuplicateProductDirective implements Validator {
//  @Input('productDuplicate') 

//  constructor(private productService: ProductService) {}

//  validate(control: AbstractControl): { [key: string]: any } | null {
//    const product = this.productService.getProduct(control.value);
//    return product ? dupProductValidator(product)(control)
//      : null;
//  }

//}
  

//export function dupProductValidator(product: Product): ValidatorFn {
//  return (control: AbstractControl): { [key: string]: any } | null => {
//    return product ? { 'product': { value: control.value } } : null;
//  };
//}
