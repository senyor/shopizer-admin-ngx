import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { StoreService } from '../services/store.service';

@Component({
  selector: 'ngx-store-detail-info',
  templateUrl: './store-detail-info.component.html',
  styleUrls: ['./store-detail-info.component.scss']
})
export class StoreDetailInfoComponent implements OnInit {
  store;
  loadingInfo = false;

  constructor(
    private storeService: StoreService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.loadingInfo = true;
    const code = this.activatedRoute.snapshot.paramMap.get('code');
    this.storeService.getStore(code)
      .subscribe(res => {
        this.store = res;
        this.loadingInfo = false;
      });
  }

  backToList() {
    this.location.back();
  }

}
