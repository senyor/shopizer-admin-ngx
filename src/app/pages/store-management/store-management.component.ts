import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-store-management',
  templateUrl: './store-management.component.html',
  styleUrls: ['./store-management.component.scss']
})
export class StoreManagementComponent implements OnInit, DoCheck {
  path = 'Store';
  sidemenuTitle = 'Merchant store';
  sidemenuValue = 'DEFAULT'; //  todo value
  sidemenuLinks = [
    {
      title: 'Store branding',
      link: 'store-branding'
    },
    {
      title: 'Store home page',
      link: 'stores-list'
    },
    {
      title: 'Store details',
      link: 'store-details'
    }
  ];
  showSide = true;

  constructor() {
  }

  ngOnInit() {
  }

  ngDoCheck() {
    this.showSide = window.location.hash.indexOf('stores-list') === -1;
  }

}
