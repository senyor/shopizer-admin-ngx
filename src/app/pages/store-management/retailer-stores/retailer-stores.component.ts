import { Component, OnInit } from '@angular/core';

import { StoreService } from '../services/store.service';

@Component({
  selector: 'ngx-retailer-stores',
  templateUrl: './retailer-stores.component.html',
  styleUrls: ['./retailer-stores.component.scss']
})
export class RetailerStoresComponent implements OnInit {

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit() {
    this.storeService.getListOfMerchantStores('DEFAULT', {}).subscribe(res => {
      console.log(res);
    });

  }

}
