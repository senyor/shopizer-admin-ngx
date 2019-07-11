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

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.loadingList = true;
    this.productService.getListOfProducts()
      .subscribe(res => {
        const products = res.products;
        products.forEach(el => {
          el.name = el.description.name;
        });
        console.log(products);
        this.source.load(products);
        this.source.setPaging(1, this.perPage, true);
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
    actions: {
      columnTitle: '',
      add: false,
      edit: true,
      delete: false,
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
        type: 'string',
        editable: false,
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
    console.log(event);
    const product = {
      available: event.newData.available,
      price: event.newData.price,
      quantity: event.newData.quantity
    };
    event.confirm.resolve(event.newData);
    console.log(product);
    // this.productService.updateProductFromTable(event.newData.id, product)
    //   .subscribe(res => {
    //     console.log(res);
    //     event.confirm.resolve(event.newData);
    //   });
  }

}
