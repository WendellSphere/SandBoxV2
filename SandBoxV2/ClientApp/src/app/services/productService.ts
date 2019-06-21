import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';


@Injectable()
export  class ProductService {
  public  products: Product[] = []
  httpClient: HttpClient;
  url: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.httpClient = http;
    this.url = baseUrl;
    this.getProducts();
  }

  getProducts() : Product [] {
     this.httpClient.get<Product[]>(this.url + 'api/Product').subscribe(result => {
      this.products = result;
    }, error => console.error(error));

    return this.products;
  }

  getProduct(name: string): Product {
    var product;
    this.httpClient.get<Product[]>(this.url + 'api/Product/' + name).subscribe(result => {
      product = result;
    }, error => console.error(error));

    return product;
  }

  add(p: Product): Observable<Product> {
    let u = this.url + 'api/Product'
    return this.httpClient.post<Product>(u, p, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

    
  }
}


export class Product {
  name: string;
  description: string;
  quantity: number;
}


