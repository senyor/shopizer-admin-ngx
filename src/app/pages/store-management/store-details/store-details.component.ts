import { Component, OnInit } from '@angular/core';

import { StoreService } from '../services/store.service';

@Component({
  selector: 'ngx-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})
export class StoreDetailsComponent implements OnInit {
  store: any;
  loading = false;
  // path = 'Store';
  // sidemenuTitle = 'Merchant store';
  // sidemenuValue = 'DEFAULT'; //  todo value
  // sidemenuLinks = [
  //   {
  //     title: 'Store branding',
  //     link: 'create-store'
  //   },
  //   {
  //     title: 'Store home page',
  //     link: 'stores-list'
  //   },
  //   {
  //     title: 'Store details',
  //     link: 'store-details'
  //   }
  // ];

  constructor(
    private storeService: StoreService,
  ) {
    this.loading = true;
    this.storeService.getStore()
      .subscribe(res => {
        this.store = res;
        this.loading = false;
      });
  }

  ngOnInit() {
  }

}
