import { Component, OnInit } from '@angular/core';

import { ProductService } from '../services/product.service';
import { LocalDataSource } from 'ng2-smart-table';
import { AvailableButtonComponent } from './available-button.component';
import { ShowcaseDialogComponent } from '../../../shared/components/showcase-dialog/showcase-dialog.component';
import { NbDialogService } from '@nebular/theme';
import { StoreService } from '../../../store-management/services/store.service';
import { UserService } from '../../../shared/services/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products = [];
  source: LocalDataSource = new LocalDataSource();
  loadingList = false;
  stores = [];
  isSuperadmin: boolean;

  // paginator
  perPage = 10;
  currentPage = 1;
  totalCount;

  // server params
  params = {
    store: 'DEFAULT',
    lang: 'en',
    count: this.perPage,
    start: 0
  };
  settings = {};

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private dialogService: NbDialogService,
    private storeService: StoreService,
    private translate: TranslateService
  ) {
    const userId = this.userService.getUserId();
    this.userService.getUser(userId)
      .subscribe(user => {
        this.userService.checkForAccess(user.groups);
        this.isSuperadmin = this.userService.roles.isSuperadmin;
        this.params.store = user.merchant;
      });
  }

  ngOnInit() {
    this.storeService.getListOfStores({start: 0})
      .subscribe(res => {
        this.stores = res.data;
      });
    this.getList();
  }

  getList() {
    const startFrom = (this.currentPage - 1) * this.perPage;
    this.params.start = startFrom;
    this.loadingList = true;
    this.productService.getListOfProducts(this.params)
      .subscribe(res => {
        const products = res.products;
        this.totalCount = res.totalCount;
        products.forEach(el => {
          el.name = el.description.name;
        });
        this.products = [...products];
        this.source.load(products);
        this.loadingList = false;
      });
    this.setSettings();
    this.translate.onLangChange.subscribe((event) => {
      this.setSettings();
    });
  }

  setSettings() {
    this.settings = {
      mode: 'inline',
      edit: {
        editButtonContent: this.translate.instant('common.edit'),
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
        id: {
          title: 'ID',
          type: 'number',
          editable: false
        },
        sku: {
          title: this.translate.instant('product.sku'),
          type: 'string',
          editable: false
        },
        name: {
          title: this.translate.instant('product.name'),
          type: 'html',
          editable: false,
          valuePrepareFunction: (name) => {
            const id = this.products.find(el => el.name === name).id;
            return `<a href="#/pages/catalogue/products/product/${ id }">${ name }</a>`;
          }
        },
        quantity: {
          title: this.translate.instant('product.qty'),
          type: 'number',
          editable: true
        },
        available: {
          filter: false,
          title: this.translate.instant('product.available'),
          type: 'custom',
          renderComponent: AvailableButtonComponent,
          defaultValue: false,
          editable: true,
          editor: {
            type: 'checkbox'
          }
        },
        price: {
          title: this.translate.instant('product.price'),
          type: 'string',
          editable: true
        },
        creationDate: {
          title: this.translate.instant('product.creationDate'),
          type: 'string',
          editable: false
        },
      },
    };
  }



  route(event) {
    console.log(event);
  }

  updateRecord(event) {
    const product = {
      available: event.newData.available,
      price: event.newData.price,
      quantity: event.newData.quantity
    };
    event.confirm.resolve(event.newData);
    this.productService.updateProductFromTable(event.newData.id, product)
      .subscribe(res => {
        console.log(res);
        event.confirm.resolve(event.newData);
      }, error => {
        console.log(error.error.message);
      });
  }

  deleteRecord(event) {
    this.dialogService.open(ShowcaseDialogComponent, {})
      .onClose.subscribe(res => {
      if (res) {
        event.confirm.resolve();
        this.productService.deleteProduct(event.data.id)
          .subscribe(result => {
            this.getList();
          });
      } else {
        event.confirm.reject();
      }
    });
  }

  choseStore(event) {
    this.params.store = event;
    this.getList();
  }

  // paginator
  changePage(event) {
    switch (event.action) {
      case 'onPage': {
        this.currentPage = event.data;
        break;
      }
      case 'onPrev': {
        this.currentPage--;
        break;
      }
      case 'onNext': {
        this.currentPage++;
        break;
      }
      case 'onFirst': {
        this.currentPage = 1;
        break;
      }
      case 'onLast': {
        this.currentPage = event.data;
        break;
      }
    }
    this.getList();
  }

}
