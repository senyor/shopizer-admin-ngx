import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../services/store.service';
import { LocalDataSource } from 'ng2-smart-table';

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
  perPage = 5;
  currentPage = 1;
  totalCount;

  // server params
  params = {
    length: this.perPage,
    start: 0
  };

  constructor(
    private storeService: StoreService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    const startFrom = (this.currentPage - 1) * this.perPage;
    this.params.start = startFrom;
    this.loadingList = true;
    this.storeService.getListOfStores(this.params)
      .subscribe(res => {
        this.totalCount = res.totalCount;
        this.source.load(res.data);
        this.loadingList = false;
      });
  }

  settings = {
    actions: {
      columnTitle: 'Details',
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      sort: true,
      custom: [
        {
          name: 'activate',
          title: '<a>Details</a>'
        }
      ],
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      }
    },
  };

  route(event) {
    this.router.navigate(['pages/store-management/store-information/', event.data.code]);
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
