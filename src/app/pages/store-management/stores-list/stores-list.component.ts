import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../services/store.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.scss']
})
export class StoresListComponent implements OnInit {
  @ViewChild('item') accordion;
  source: LocalDataSource = new LocalDataSource();
  showStoreDetails = false;
  store;
  perPage = 10;
  loadingList = false;

  constructor(
    private storeService: StoreService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.getList();
  }

  getList () {
    this.loadingList = true;
    this.storeService.getListOfStores()
      .subscribe(stores => {
        this.source.load(stores.data);
        this.source.setPaging(1, this.perPage, true);
        this.loadingList = false;
        // open accordion tab
        this.accordion.toggle();
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

  route(e) {
    this.showStoreDetails = true;
    this.store = e.data;
  }

  backToList() {
    this.showStoreDetails = false;
    this.getList();
  }


}
