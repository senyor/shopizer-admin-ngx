import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../shared/services/user.service';
import { LocalDataSource } from 'ng2-smart-table';
import { User } from '../../shared/models/user';

@Component({
  selector: 'ngx-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  path = 'User';
  user = User;
  loadingList = false;

  // paginator
  perPage = 3;
  currentPage = 1;
  totalCount;

  // server params
  params = {
    store: 'DEFAULT',
    lang: 'en',
    length: this.perPage,
    start: 0
  };

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.getList();
  }

  getList() {
    const startFrom = (this.currentPage - 1) * this.perPage;
    this.params.start = startFrom;
    this.loadingList = true;
    this.userService.getUsersList(this.params)
      .subscribe(res => {
        const usersArray = [...res.data];
        // todo change recordsTotal to totalCount
        this.totalCount = res.recordsTotal;

        // remove current user from list
        // const index = usersArray.findIndex(el => el.id === +this.userService.getUserId());
        // usersArray.splice(index, 1);

        // create 'name' property for displaying in the table
        usersArray.map(user => {
          user.name = user.firstName + ' ' + user.lastName;
          return user;
        });
        this.source.load(usersArray);
        this.loadingList = false;
      });
  }

  ngOnInit() {
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
        title: 'Customer Name',
        type: 'string',
      },
      emailAddress: {
        title: 'email',
        type: 'string',
      },
      active: {
        title: 'Status',
        type: 'string',
      }
    },
  };

  route(event) {
    this.router.navigate(['pages/user-management/user-details/', event.data.id]);
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
