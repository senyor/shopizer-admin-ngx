import { Component, OnInit } from '@angular/core';

import { ProductService } from '../services/product.service';
import { LocalDataSource } from 'ng2-smart-table';
import { AvailableButtonComponent } from './available-button.component';
import { ShowcaseDialogComponent } from '../../../shared/components/showcase-dialog/showcase-dialog.component';
import { NbDialogService } from '@nebular/theme';
import { StoreService } from '../../../store-management/services/store.service';
import { UserService } from '../../../shared/services/user.service';

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
  perPage = 5;
  currentPage = 1;
  totalCount;

  // server params
  params = {
    store: 'DEFAULT',
    lang: 'en',
    count: this.perPage,
    start: 0
  };

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private dialogService: NbDialogService,
    private storeService: StoreService,
  ) {
    const userId = this.userService.getUserId();
    this.userService.getUser(userId)
      .subscribe(user => {
        this.userService.checkForAccess(user.permissions);
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
  }

  settings = {
    mode: 'inline',
    edit: {
      editButtonContent: 'Edit',
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
        title: 'Sku',
        type: 'string',
        editable: false
      },
      name: {
        title: 'Name',
        type: 'html',
        editable: false,
        valuePrepareFunction: (name) => {
          const id = this.products.find(el => el.name === name).id;
          return `<a href="#/pages/catalogue/products/product/${ id }">${ name }</a>`;
        }
      },
      quantity: {
        title: 'Qty',
        type: 'number',
        editable: true
      },
      available: {
        filter: false,
        title: 'Available',
        type: 'custom',
        renderComponent: AvailableButtonComponent,
        defaultValue: false,
        editable: true,
        editor: {
          type: 'checkbox'
        }
      },
      price: {
        title: 'Price',
        type: 'string',
        editable: true
      },
      creationDate: {
        title: 'Created',
        type: 'string',
        editable: false
      },
    },
  };

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
    console.log(product);
    this.productService.updateProductFromTable(event.newData.id, product)
      .subscribe(res => {
        console.log(res);
        event.confirm.resolve(event.newData);
      });
  }

  deleteRecord(event) {
    this.dialogService.open(ShowcaseDialogComponent, {})
      .onClose.subscribe(res => {
      if (res) {
        event.confirm.resolve();
        this.productService.deleteProduct(event.data.id)
          .subscribe(result => {
            console.log(result);
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
    }
    this.getList();
  }

}
