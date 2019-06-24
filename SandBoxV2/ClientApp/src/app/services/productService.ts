import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Product } from '../models/Product';


@Injectable()
export  class ProductService {
  public products: Product[] = []
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

  getProduct(name: string): Promise<Product> {
    return this.httpClient.get<Product>(this.baseUrl + 'api/Product/' + name).map((response: Product) => response).toPromise();
  }

  addIfNotDuplicate(productName: string, subProduct: Product): Promise<Product> {
    return this.httpClient.post<Product>(this.baseUrl + 'api/Product/' + productName, subProduct, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).map((response: Product) =>  response).toPromise();
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



interface  IProduct {
  name: string;
  description: string;
  quantity: number;
}
