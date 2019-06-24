import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/Product';


@Injectable()
export  class ProductService {
  public products: Product[] = []
  product : Product
  timerSubscription: Subscription;

  constructor(private httpClient: HttpClient,  @Inject('BASE_URL')  private baseUrl: string) {}
  

  getProducts() : Product [] {
    this.httpClient.get<Product[]>(this.baseUrl + 'api/Product').subscribe(result => {
      this.products = result;
    }, error => console.error(error));

    return this.products;
  }

  getProductsSubscription(): Subscription{
    return this.httpClient.get<Product[]>(this.baseUrl + 'api/Product').subscribe(result => {
      this.products = result;
    }, error => console.error(error));

  }

   getProduct(name: string): Product {
     this.httpClient.get<Product>(this.baseUrl + 'api/Product/' + name).subscribe(result => {
       this.product = result;
     }, error => console.log(error));

    return this.product;
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



