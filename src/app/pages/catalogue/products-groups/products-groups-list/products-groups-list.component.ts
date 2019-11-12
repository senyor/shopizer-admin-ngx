import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../products/services/product.service';

@Component({
  selector: 'ngx-products-groups-list',
  templateUrl: './products-groups-list.component.html',
  styleUrls: ['./products-groups-list.component.scss']
})
export class ProductsGroupsListComponent implements OnInit {
  availableList: any[];
  selectedList: any[];
  groups = ['1', '2', '3'];

  constructor(
    private productService: ProductService,
  ) {
  }

  ngOnInit() {
    const params = {
      // TODO take store from localstorage
      store: 'DEFAULT',
      lang: 'en',
      count: -1,
      start: 0
    };
    this.productService.getListOfProducts(params)
      .subscribe(res => {
        console.log(res.products);
        this.availableList = [...res.products];
      });
  }

}
