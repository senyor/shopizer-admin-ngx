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

  constructor(
    private storeService: StoreService,
  ) {
    this.loading = true;
    const code = JSON.parse(localStorage.getItem('merchant'));
    this.storeService.getStore(code)
      .subscribe(res => {
        this.store = res;
        this.loading = false;
      });
  }

  ngOnInit() {
  }

}
