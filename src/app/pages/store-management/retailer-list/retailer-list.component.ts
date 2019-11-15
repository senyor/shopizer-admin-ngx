import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocalDataSource } from 'ng2-smart-table';
import { StoreService } from '../services/store.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-retailer-list',
  templateUrl: './retailer-list.component.html',
  styleUrls: ['./retailer-list.component.scss']
})
export class RetailerListComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  store;
  loadingList = false;

  // paginator
  perPage = 5;
  currentPage = 1;
  totalCount;

  // server params
  params = {
    length: this.perPage,
    start: 0
  };

  settings = {};

  constructor(
    private storeService: StoreService,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    const startFrom = (this.currentPage - 1) * this.perPage;
    this.params.start = startFrom;
    this.loadingList = true;
    this.storeService.getListOfStores(this.params)
      .subscribe(res => {
        this.totalCount = res.totalPages;
        const retailers = [];
        console.log(res.data);
        res.data.forEach((el) => {
          if (el.retailer) {
            retailers.push(el);
          }
        });
        this.source.load(retailers);
        this.loadingList = false;
      });
    this.setSettings();
    this.translate.onLangChange.subscribe((event) => {
      this.setSettings();
    });
  }

  setSettings() {
    this.settings = {
      actions: {
        columnTitle: '',
        add: false,
        edit: false,
        delete: false,
        position: 'right',
        sort: true,
        custom: [
          {
            name: 'activate',
            title: `${this.translate.instant('COMMON.DETAILS')}`
          }
        ],
      },
      columns: {
        id: {
          title: this.translate.instant('COMMON.ID'),
          type: 'number',
        },
        name: {
          title: this.translate.instant('COMMON.STORE_NAME'),
          type: 'string',
        },
        email: {
          title: this.translate.instant('COMMON.EMAIL_ADDRESS'),
          type: 'string',
        }
      },
    };
  }

  route(event) {
    this.router.navigate(['pages/store-management/store/', event.data.code]);
  }

  // paginator
  changePage(event) {
    switch (event.action) {
      case 'onPage': {
        this.currentPage = event.data;
        break;
      }
      case 'onPrev': {
        this.currentPage--;
        break;
      }
      case 'onNext': {
        this.currentPage++;
        break;
      }
    }
    this.getList();
  }


}
