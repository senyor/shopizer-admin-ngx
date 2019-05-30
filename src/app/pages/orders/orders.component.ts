import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  tabs: any[] = [
    {
      title: 'List of orders',
      route: ['order-list'],
      responsive: true,
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
