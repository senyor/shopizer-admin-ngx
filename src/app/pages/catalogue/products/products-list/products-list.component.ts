import { Component, OnInit } from '@angular/core';

import { ProductService } from '../services/product.service';
import { LocalDataSource } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';
import { AvailableButtonComponent } from './available-button.component';

@Component({
  selector: 'ngx-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products = [];
  source: LocalDataSource = new LocalDataSource();
  perPage = 10;
  loadingList = false;
  buttonDetails = '<button class="btn btn-primary cell-style" ' +
    'style="padding: 2px 15px; margin: 10px 0px !important;"><span>Details</span></button>';

  constructor(
    private productService: ProductService,
    private _sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.loadingList = true;
    this.productService.getListOfProducts()
      .subscribe(products => {
        console.log(products.products);
        this.source.load(products.products);
        this.source.setPaging(1, this.perPage, true);
        this.loadingList = false;
      });
  }

  settings = {
    actions: {
      columnTitle: '',
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      sort: true,
      custom: [
        { name: 'details', title: this._sanitizer.bypassSecurityTrustHtml(this.buttonDetails) }
      ],
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      sku: {
        title: 'Sku',
        type: 'string',
      },
      description: {
        title: 'Name',
        type: 'string',
        valuePrepareFunction: (description) => {
          if (description) {
            return description.name;
          }
        }
      },
      quantity: {
        title: 'Qty',
        type: 'string',
      },
      available: {
        filter: false,
        title: 'Available',
        type: 'custom',
        renderComponent: AvailableButtonComponent,
        defaultValue: false,
      },
      price: {
        title: 'Price',
        type: 'string',
      },
      creationDate: {
        title: 'Created',
        type: 'string',
      },
    },
  };

  route(event) {
    console.log(event);
  }


}
