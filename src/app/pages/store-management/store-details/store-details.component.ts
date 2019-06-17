import { Component, OnInit } from '@angular/core';

import { StoreService } from '../services/store.service';

@Component({
  selector: 'ngx-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})
export class StoreDetailsComponent implements OnInit {
  store: any;

  constructor(
    private storeService: StoreService,
  ) {
    this.storeService.getStore()
      .subscribe(res => {
        this.store = res;
      });
  }

  ngOnInit() {
  }

}
