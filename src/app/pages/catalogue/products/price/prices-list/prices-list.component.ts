import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { LocalDataSource } from 'ng2-smart-table';
import { ProductService } from '../../services/product.service';
import { NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { InventoryService } from '../../services/inventory.service';
import { ShowcaseDialogComponent } from '../../../../shared/components/showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-prices-list',
  templateUrl: './prices-list.component.html',
  styleUrls: ['./prices-list.component.scss']
})
export class PricesListComponent implements OnInit {
  @Input() prices;
  source: LocalDataSource = new LocalDataSource();
  loadingList = false;

  // paginator
  perPage = 10;
  currentPage = 1;
  totalCount;

  // server params
  // params = {
  //   count: this.perPage,
  //   page: 0
  // };
  settings = {};

  constructor(
    private productService: ProductService,
    private dialogService: NbDialogService,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private inventoryService: InventoryService,
    private _sanitizer: DomSanitizer,
  ) {
    // this.productId = this.activatedRoute.snapshot.paramMap.get('productId');
    // this.productService.getProductById(this.productId).subscribe(product => {
    //   this.product = product;
    // });
  }

  ngOnInit() {
    console.log(this.prices);
    this.getList();
  }

  getList() {
    this.prices = (this.prices && this.prices.length) ? this.prices : [];
    this.source.load(this.prices);
    // this.loadingList = true;
    // const id = (this.product && this.product.id) || this.productId;
    // this.params.page = this.currentPage - 1;
    // this.inventoryService.getListOfInventories(id, this.params)
    //   .subscribe(res => {
    //     this.totalCount = res.recordsTotal;
    //     this.source.load(res.inventory);
    //     this.loadingList = false;
    //   });
    this.setSettings();
    this.translate.onLangChange.subscribe((event) => {
      this.setSettings();
    });
  }

  setSettings() {
    this.settings = {
      actions: {
        columnTitle: '',
        add: false,
        edit: false,
        delete: false,
        position: 'right',
        sort: true,
        custom: [
          { name: 'details', title: `${this.translate.instant('common.edit')}` },
          { name: 'remove', title: this._sanitizer.bypassSecurityTrustHtml('<i class="fas fa-trash-alt"></i>') }
        ],
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
            return (prices.length && prices[0].originalPrice) ? prices[0].originalPrice : 'null';
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
    switch (event.action) {
      case 'details':
        // this.router.navigate([`pages/catalogue/products/${this.product.id}/inventory-details/${event.data.id}`]);
        break;
      case 'remove':
        this.dialogService.open(ShowcaseDialogComponent, {})
          .onClose.subscribe(res => {
          if (res) {
            console.log('remove');
            this.inventoryService.deleteProduct(event.data.id)
              .subscribe((data) => {
                console.log(data);
                this.getList();
              });
          }
        });
    }
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
