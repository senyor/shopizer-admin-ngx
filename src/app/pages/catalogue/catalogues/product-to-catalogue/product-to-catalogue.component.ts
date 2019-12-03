import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-product-to-catalogue',
  templateUrl: './product-to-catalogue.component.html',
  styleUrls: ['./product-to-catalogue.component.scss']
})
export class ProductToCatalogueComponent implements OnInit {
  availableList: any[];
  selectedList: any[];
  catalogues = [];
  selectedGroup;

  constructor(
    // private productService: ProductService,
    // private productGroupsService: ProductGroupsService,
    // private storageService: StorageService
  ) {
    // todo get catalogues list
    // todo get products

    // const params = {
    //   store: this.storageService.getMerchant(),
    //   lang: 'en',
    //   count: -1,
    //   start: 0
    // };
    // forkJoin(this.productService.getListOfProducts(params), this.productGroupsService.getListOfProductGroups())
    //   .subscribe(([products, groups]) => {
    //     this.availableList = [...products.products];
    //     this.groups = [...groups];
    //   });
  }

  ngOnInit() {
    this.availableList = [{
      'id': 1,
      'code': 'DEFAULT1',
      'descriptions': [
        {
          'id': 600,
          'language': null,
          'name': 'DEFAULT123',
          'description': 'DEFAULT',
          'friendlyUrl': null,
          'keyWords': null,
          'highlights': null,
          'metaDescription': null,
          'title': null
        },
        {
          'id': 600,
          'language': null,
          'name': 'DEFAULT321',
          'description': 'DEFAULT',
          'friendlyUrl': null,
          'keyWords': null,
          'highlights': null,
          'metaDescription': null,
          'title': null
        }
      ]
    }, {
      'id': 1,
      'code': 'DEFAULT2',
      'descriptions': [
        {
          'id': 600,
          'language': null,
          'name': 'DEFAULT22222222222',
          'description': 'DEFAULT',
          'friendlyUrl': null,
          'keyWords': null,
          'highlights': null,
          'metaDescription': null,
          'title': null
        },
        {
          'id': 600,
          'language': null,
          'name': 'DEFAULT3333333333333',
          'description': 'DEFAULT',
          'friendlyUrl': null,
          'keyWords': null,
          'highlights': null,
          'metaDescription': null,
          'title': null
        }
      ]
    }
    ];
    this.selectedList = [];
  }

  selectGroup(groupCode) {
    this.selectedGroup = groupCode;
    console.log(this.selectedGroup);
    // todo get products by catalogue
    // this.productGroupsService.getProductsByGroup(this.selectedGroup)
    //   .subscribe(res => {
    //     console.log(res);
    //     this.selectedList = [...res.products];
    //     this.availableList = this.availableList.filter(n => !this.selectedList.some(n2 => n.id === n2.id));
    //   });
  }

  moveEvent(e, type) {
    console.log(e, type);
    // switch (type) {
    //   case 'toTarget':
    //     this.addProductToGroup(e.items[0].id, this.selectedGroup);
    //     break;
    //   case 'toSource':
    //     this.removeProductFromGroup(e.items[0].id, this.selectedGroup);
    //     break;
    //   case 'allToTarget':
    //     const addArray = [];
    //     e.items.forEach((el) => {
    //       const req = this.productGroupsService.addProductToGroup(el.id, this.selectedGroup);
    //       addArray.push(req);
    //     });
    //     console.log(addArray);
    //     forkJoin(addArray).subscribe(res => {
    //       // console.log(res);
    //     });
    //     break;
    //   case 'allToSource':
    //     const removeArr = [];
    //     e.items.forEach((el) => {
    //       const req = this.productGroupsService.removeProductFromGroup(el.id, this.selectedGroup);
    //       removeArr.push(req);
    //     });
    //     forkJoin(removeArr).subscribe(res => {
    //       // console.log(res);
    //     });
    //     break;
    // }
  }

}
