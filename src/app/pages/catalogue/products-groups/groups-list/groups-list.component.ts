import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ShowcaseDialogComponent } from '../../../shared/components/showcase-dialog/showcase-dialog.component';
import { ProductGroupsService } from '../services/product-groups.service';
import { ActiveButtonComponent } from './active-button.component';

@Component({
  selector: 'ngx-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit {
  products = [];
  source: LocalDataSource = new LocalDataSource();
  loadingList = false;
  stores = [];
  isSuperadmin: boolean;

  // // paginator
  // perPage = 10;
  // currentPage = 1;
  // totalCount;
  //
  // // server params
  // params = {
  //   store: 'DEFAULT',
  //   lang: 'en',
  //   count: this.perPage,
  //   start: 0
  // };
  settings = {};

  constructor(
    // private userService: UserService,
    // private productService: ProductService,
    private dialogService: NbDialogService,
    // private storeService: StoreService,
    private translate: TranslateService,
    private productGroupsService: ProductGroupsService
  ) {
    // const userId = this.userService.getUserId();
    // this.userService.getUser(userId)
    //   .subscribe(user => {
    //     this.userService.checkForAccess(user.groups);
    //     this.isSuperadmin = this.userService.roles.isSuperadmin;
    //     this.params.store = user.merchant;
    //   });
  }

  ngOnInit() {
    // this.storeService.getListOfStores({ start: 0 })
    //   .subscribe(res => {
    //     this.stores = res.data;
    //   });
    this.getList();
  }

  getList() {
    // const startFrom = (this.currentPage - 1) * this.perPage;
    // this.params.start = startFrom;
    this.loadingList = true;
    this.productGroupsService.getListOfProductGroups({}).subscribe(res => {
      console.log(res);
      this.source.load(res);
      this.loadingList = false;
    });
    // this.productService.getListOfProducts(this.params)
    //   .subscribe(res => {
    //     const products = res.products;
    //     this.totalCount = res.totalPages;
    //     products.forEach(el => {
    //       el.name = el.description.name;
    //     });
    //     this.products = [...products];
    //     this.source.load(products);
    //     this.loadingList = false;
    //   });
    this.setSettings();
    this.translate.onLangChange.subscribe((event) => {
      this.setSettings();
    });
  }

  setSettings() {
    this.settings = {
      mode: 'inline',
      edit: {
        editButtonContent: this.translate.instant('COMMON.EDIT'),
        saveButtonContent: '<i class="fas fa-check"></i>',
        cancelButtonContent: '<i class="fas fa-times"></i>',
        confirmSave: true
      },
      delete: {
        deleteButtonContent: '<i class="fas fa-trash-alt"></i>',
        confirmDelete: true
      },
      actions: {
        columnTitle: '',
        add: false,
        edit: true,
        delete: true,
        position: 'right',
        sort: true,
      },
      columns: {
        code: {
          title: this.translate.instant('COMMON.CODE'),
          type: 'string',
          editable: false
        },
        available: {
          filter: false,
          title: this.translate.instant('COMMON.AVAILABLE'),
          type: 'custom',
          renderComponent: ActiveButtonComponent,
          defaultValue: false,
          editable: true,
          editor: {
            type: 'checkbox'
          }
        },
      },
    };
  }

  updateRecord(event) {
    const product = {
      available: event.newData.available,
      price: event.newData.price,
      quantity: event.newData.quantity
    };
    event.confirm.resolve(event.newData);
    // this.productService.updateProductFromTable(event.newData.id, product)
    //   .subscribe(res => {
    //     console.log(res);
    //     event.confirm.resolve(event.newData);
    //   }, error => {
    //     console.log(error.error.message);
    //   });
  }

  deleteRecord(event) {
    this.dialogService.open(ShowcaseDialogComponent, {})
      .onClose.subscribe(res => {
      if (res) {
        event.confirm.resolve();
        this.productGroupsService.removeProductGroup(event.data.id)
          .subscribe(result => {
            this.getList();
          });
      } else {
        event.confirm.reject();
      }
    });
  }

  //
  // choseStore(event) {
  //   this.params.store = event;
  //   this.getList();
  // }

  // // paginator
  // changePage(event) {
  //   switch (event.action) {
  //     case 'onPage': {
  //       this.currentPage = event.data;
  //       break;
  //     }
  //     case 'onPrev': {
  //       this.currentPage--;
  //       break;
  //     }
  //     case 'onNext': {
  //       this.currentPage++;
  //       break;
  //     }
  //     case 'onFirst': {
  //       this.currentPage = 1;
  //       break;
  //     }
  //     case 'onLast': {
  //       this.currentPage = event.data;
  //       break;
  //     }
  //   }
  //   this.getList();
  // }

}
