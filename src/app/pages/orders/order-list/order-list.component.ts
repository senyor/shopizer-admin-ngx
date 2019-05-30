import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'ngx-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  source = [];

  constructor(
    private ordersService: OrdersService
  ) {
    this.ordersService.getOrders()
      .subscribe(orders => {
        this.source = [...orders.orders];
      });
  }

  ngOnInit() {
  }

  settings = {
    actions: {
      columnTitle: 'Details',
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        {
          name: 'activate',
          title: '<a>Details</a>'
        }
      ],
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      billing: {
        title: 'Customer Name',
        type: 'string',
        valuePrepareFunction: (customer) => {
          return customer.firstName + ' ' + customer.lastName;
        }
      },
      total: {
        title: 'Total',
        type: 'string',
        valuePrepareFunction: (total) => {
          return total.value;
        }
      },
      datePurchased: {
        title: 'Order date',
        type: 'string',
        valuePrepareFunction: (date) => {
          if (date) {
            return new DatePipe('en-GB').transform(date, 'dd/MM/yyyy');
          }
        }
      },
      orderStatus: {
        title: 'Status',
        type: 'string',
      },
      paymentModule: {
        title: 'Payment module',
        type: 'string',
      },
    },
  };

  route(ev) {
    // todo route ro detail page
    console.log(ev);
  }

}
