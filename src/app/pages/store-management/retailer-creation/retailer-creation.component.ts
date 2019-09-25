import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'ngx-retailer-creation',
  templateUrl: './retailer-creation.component.html',
  styleUrls: ['./retailer-creation.component.scss']
})
export class RetailerCreationComponent implements OnInit {
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
