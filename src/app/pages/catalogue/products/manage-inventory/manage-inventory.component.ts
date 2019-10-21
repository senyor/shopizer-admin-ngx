import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../../shared/services/user.service';
import { ProductService } from '../services/product.service';
import { NbDialogService } from '@nebular/theme';
import { StoreService } from '../../../store-management/services/store.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'ngx-manage-inventory',
  templateUrl: './manage-inventory.component.html',
  styleUrls: ['./manage-inventory.component.scss']
})
export class ManageInventoryComponent implements OnInit {
  inventoryList = [];
  source: LocalDataSource = new LocalDataSource();
  loadingList = false;
  stores = [];
  product;

  // paginator
  perPage = 10;
  currentPage = 1;
  totalCount;

  // server params
  params = {
    count: this.perPage,
    page: 0
  };
  settings = {};

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private dialogService: NbDialogService,
    private storeService: StoreService,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private inventoryService: InventoryService,
  ) {
    const userId = this.userService.getUserId();
    const id = this.activatedRoute.snapshot.paramMap.get('productId');
    this.productService.getProductById(id).subscribe(product => {
      this.product = product;
      this.getList();
    });
  }

  ngOnInit() {
  }

  getList() {
    this.loadingList = true;
    this.inventoryService.getListOfInventories(this.product.id, this.params)
      .subscribe(res => {
        this.totalCount = res.totalCount;
        console.log(res.inventory);
        this.inventoryList = [...res.inventory];
        this.source.load(this.inventoryList);
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
        edit: false,
        delete: false,
        position: 'right',
        sort: true,
      },
      columns: {
        store: {
          title: 'Store',
          type: 'string',
          editable: false,
          valuePrepareFunction: (store) => {
            return store.code;
          }
        },
        owner: {
          title: 'Owner',
          type: 'string',
          editable: false,
          valuePrepareFunction: (owner) => {
            return owner ? owner : 'null';
          }
        },
        quantity: {
          title: this.translate.instant('product.qty'),
          type: 'number',
          editable: true
        },
        prices: {
          title: this.translate.instant('product.price'),
          type: 'string',
          editable: true,
          valuePrepareFunction: (prices) => {
            return prices[0].originalPrice;
          }
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
    // const product = {
    //   available: event.newData.available,
    //   price: event.newData.price,
    //   quantity: event.newData.quantity
    // };
    // event.confirm.resolve(event.newData);
    // this.productService.updateProductFromTable(event.newData.id, product)
    //   .subscribe(res => {
    //     console.log(res);
    //     event.confirm.resolve(event.newData);
    //   }, error => {
    //     console.log(error.error.message);
    //   });
  }

  deleteRecord(event) {
    // this.dialogService.open(ShowcaseDialogComponent, {})
    //   .onClose.subscribe(res => {
    //   if (res) {
    //     event.confirm.resolve();
    //     this.productService.deleteProduct(event.data.id)
    //       .subscribe(result => {
    //       });
    //   } else {
    //     event.confirm.reject();
    //   }
    // });
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
