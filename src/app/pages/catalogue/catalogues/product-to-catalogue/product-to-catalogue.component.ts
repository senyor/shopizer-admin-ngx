import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CatalogService } from '../services/catalog.service';
import { StorageService } from '../../../shared/services/storage.service';
import { forkJoin } from 'rxjs';
import { ProductService } from '../../products/services/product.service';
import { CategoryService } from '../../categories/services/category.service';

@Component({
  selector: 'ngx-product-to-catalogue',
  templateUrl: './product-to-catalogue.component.html',
  styleUrls: ['./product-to-catalogue.component.scss']
})
export class ProductToCatalogueComponent implements OnInit {
  availableList = [];
  selectedList = [];
  categories = [];
  selectedCategory;
  catalog;

  constructor(
    private productService: ProductService,
    private storageService: StorageService,
    private catalogService: CatalogService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('catalogId');
    const params = {
      store: this.storageService.getMerchant(),
      lang: this.storageService.getLanguage(),
      count: 100,
      page: 0
    };
    const products$ = this.productService.getListOfProducts(params);
    const catalog$ = this.catalogService.getCatalogById(id);
    const categories$ = this.categoryService.getListOfCategories({ count: 100, page: 0 });
    forkJoin(products$, catalog$, categories$)
      .subscribe(([products, catalog, categories]) => {
        this.availableList = [...products.products];
        this.catalog = catalog;
        this.categories = [...categories.categories];
      });
  }

  ngOnInit() {
  }

  moveEvent(e, type) {
    console.log(e, type);
    switch (type) {
      case 'toTarget':
        const catalogEntry = {
          categoryCode: this.selectedCategory,
          productCode: e.items[0].sku,
          visible: true
        };
        // this.catalogService.addCatalogEntry(this.catalog.id, catalogEntry)
        //   .subscribe(res => {
        //     console.log(res);
        //   });
        break;
      case 'toSource':
        // this.catalogService.removeCatalogEntry(this.catalog.id, catalogEntry)
        //   .subscribe(res => {
        //     console.log(res);
        //   });
        break;
      case 'allToTarget':
        // const addArray = [];
        // e.items.forEach((el) => {
        //   const req = this.productGroupsService.addProductToGroup(el.id, this.selectedGroup);
        //   addArray.push(req);
        // });
        // console.log(addArray);
        // forkJoin(addArray).subscribe(res => {
        //   // console.log(res);
        // });
        break;
      case 'allToSource':
        // const removeArr = [];
        // e.items.forEach((el) => {
        //   const req = this.productGroupsService.removeProductFromGroup(el.id, this.selectedGroup);
        //   removeArr.push(req);
        // });
        // forkJoin(removeArr).subscribe(res => {
        //   // console.log(res);
        // });
        break;
    }
  }

  selectGroup(groupCode) {
    this.selectedCategory = groupCode;
    console.log(this.selectedCategory);
    // todo get products by catalogue
    // this.productGroupsService.getProductsByGroup(this.selectedGroup)
    //   .subscribe(res => {
    //     console.log(res);
    //     this.selectedList = [...res.products];
    //     this.availableList = this.availableList.filter(n => !this.selectedList.some(n2 => n.id === n2.id));
    //   });
  }

}
