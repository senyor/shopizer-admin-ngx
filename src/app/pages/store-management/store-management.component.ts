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
      link: 'create-store'
    },
    {
      title: 'Store home page',
      link: 'create-store'
    },
    {
      title: 'Store details',
      link: 'create-store'
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
