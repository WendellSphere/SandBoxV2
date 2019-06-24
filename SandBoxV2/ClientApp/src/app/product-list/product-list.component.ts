import { Component, Inject, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/productService'
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Component({
  selector: 'productList',
  templateUrl: './product-list.component.html',
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {
  productService: ProductService;
  httpClient: HttpClient;
  url: string;
  timerSubscription: any;
  productsSubscription: any;


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, p: ProductService) {
    this.httpClient = http;
    this.url = baseUrl
    this.productService = p;
  }

  ngOnInit() {
    this.refreshData();
  }

  refreshData(): void {
    this.productsSubscription = this.productService.getProductsSubscription();
    this.subscribeToData();
  }

  private subscribeToData(): void {
    this.timerSubscription = Observable.timer(2000).first().subscribe(() => this.refreshData());
  }

  public ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}

