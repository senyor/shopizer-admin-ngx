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
    this.storeService.getStore('DEFAULT')
      .subscribe(res => {
        this.store = res;
        this.loading = false;
      });
  }

  ngOnInit() {
  }

}
