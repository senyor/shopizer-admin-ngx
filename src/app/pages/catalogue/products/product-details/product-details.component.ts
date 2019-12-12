import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../services/product.service';

@Component({
  selector: 'ngx-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: any = {};
  loadingInfo = false;
  selectedItem = '0';

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
  ) {
  }

  ngOnInit() {
    this.loadingInfo = true;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getProductById(id)
      .subscribe(res => {
        this.product = res;
        this.loadingInfo = false;
      });
  }

}
