import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProductService } from '../services/product.service';

@Component({
  selector: 'ngx-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: any = {};
  loadingInfo = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private productService: ProductService
  ) {
  }

  ngOnInit() {
    this.loadingInfo = true;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getProductById(id)
      .subscribe(res => {
        console.log(res);
        this.product = res;
        this.loadingInfo = false;
      });
  }

  backToList() {
    this.location.back();
  }

}
