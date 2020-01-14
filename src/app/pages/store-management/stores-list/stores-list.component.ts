import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../services/store.service';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.scss']
})
export class StoresListComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  store;
  loadingList = false;

  // paginator
  perPage = 10;
  currentPage = 1;
  totalCount;
  totalPages;

  // server params
  params = {
    count: this.perPage,
    page: 0,
  };

  settings = {};

  constructor(
    private storeService: StoreService,
    private router: Router,
    private translate: TranslateService,
  ) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    const startFrom = this.currentPage - 1;
    this.params.page = startFrom;
    this.loadingList = true;
    this.storeService.getListOfStores(this.params)
      .subscribe(res => {
        this.totalCount = res.recordsTotal;
        this.totalPages = res.totalPages;
        this.source.load(res.data);
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
      pager: { display: false },
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
    console.log('Current page now' + this.currentPage);
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
      case 'onLast': {
        this.currentPage = this.totalPages;
        break;
      }
      case 'onFirst': {
        this.currentPage = 1;
        break;
      }
    }
    this.getList();
  }

}
