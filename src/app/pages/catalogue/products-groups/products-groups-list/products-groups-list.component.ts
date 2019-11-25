import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../products/services/product.service';
import { ProductGroupsService } from '../services/product-groups.service';
import { StorageService } from '../../../shared/services/storage.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'ngx-products-groups-list',
  templateUrl: './products-groups-list.component.html',
  styleUrls: ['./products-groups-list.component.scss']
})
export class ProductsGroupsListComponent implements OnInit {
  availableList = [];
  selectedList = [];
  groups = [];
  selectedGroup;

  constructor(
    private productService: ProductService,
    private productGroupsService: ProductGroupsService,
    private storageService: StorageService
  ) {
    const params = {
      store: this.storageService.getMerchant(),
      lang: 'en',
      count: -1,
      start: 0
    };
    this.productService.getListOfProducts(params)
      .subscribe(res => {
        console.log(res.products);
        this.availableList = [...res.products];
      });
    this.productGroupsService.getListOfProductGroups().subscribe(res => {
      console.log(res);
      this.groups = [...res];
    });
  }

  ngOnInit() {
  }

  moveEvent(e, type) {
    console.log(e.items[0].id, type);
    switch (type) {
      case 'toTarget':
        this.addProductToGroup(e.items[0].id, this.selectedGroup);
        break;
      case 'toSource':
        this.removeProductFromGroup(e.items[0].id, this.selectedGroup);
        break;
      case 'allToTarget':
        const addArray = [];
        e.items.forEach((el) => {
          const req = this.addProductToGroup(el.id, this.selectedGroup);
          addArray.push(req);
        });
        console.log(addArray);
        forkJoin(addArray).subscribe(res => {
          console.log(res);
        });
        break;
      case 'allToSource':
        const removeArr = [];
        e.items.forEach((el) => {
          const req = this.removeProductFromGroup(el.id, this.selectedGroup);
          removeArr.push(req);
        });
        console.log(removeArr);
        forkJoin(removeArr).subscribe(res => {
          console.log(res);
        });
        break;
    }
  }

  addProductToGroup(productId, groupCode) {
    this.productGroupsService.addProductToGroup(productId, groupCode)
      .subscribe(res => {
        console.log(res);
      });
  }

  removeProductFromGroup(productId, groupCode) {
    this.productGroupsService.removeProductFromGroup(productId, groupCode)
      .subscribe(res => {
        console.log(res);
      });
  }

  selectGroup(groupCode) {
    this.selectedGroup = groupCode;
    console.log(this.selectedGroup);
    this.productGroupsService.getProductsByGroup(this.selectedGroup)
      .subscribe(res => {
        console.log(res);
        this.selectedList = [...res.products];
        this.availableList = this.availableList.filter(n => !this.selectedList.some(n2 => n.id === n2.id));
      });
  }

}
