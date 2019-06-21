import { Component, Inject, OnInit, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/productService'




@Component({
  selector: 'productList',
  templateUrl: './prod-list.component.html',
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {
  productService: ProductService;
  httpClient: HttpClient;
  url: string;
  
  
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, p: ProductService) {
    this.httpClient = http;
    this.url = baseUrl
    this.productService = p;
}

  ngOnInit() {
    this.productService.products = this.productService.getProducts();
   }
}

interface Products {
  name: string;
  description: string;
  quantity: number;
}
