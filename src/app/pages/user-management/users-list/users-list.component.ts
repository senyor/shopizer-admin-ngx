import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../shared/services/user.service';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  loadingList = false;

  // paginator
  perPage = 5;
  currentPage = 1;
  totalCount;

  // server params
  params = {
    lang: 'en',
    length: this.perPage,
    start: 0
  };

  settings = {};

  constructor(
    private userService: UserService,
    private router: Router,
    private translate: TranslateService,
  ) {
    this.getList();
  }

  getList() {
    const startFrom = (this.currentPage - 1) * this.perPage;
    this.params.start = startFrom;
    this.loadingList = true;
    this.userService.getUsersList('DEFAULT', this.params)
      .subscribe(res => {
        const usersArray = [...res.data];
        this.totalCount = res.recordsTotal;

        // remove current user from list
        // const index = usersArray.findIndex(el => el.id === +this.userService.getUserId());
        // usersArray.splice(index, 1);

        // creating 'name' property for displaying in the table
        usersArray.map(user => {
          user.name = user.firstName + ' ' + user.lastName;
          return user;
        });
        this.source.load(usersArray);
        this.loadingList = false;
      });
    this.setSettings();
    this.translate.onLangChange.subscribe((event) => {
      this.setSettings();
    });
  }

  ngOnInit() {
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
          title: this.translate.instant('COMMON.NAME'),
          type: 'string',
        },
        emailAddress: {
          title: this.translate.instant('COMMON.EMAIL_ADDRESS'),
          type: 'string',
        },
        active: {
          title: this.translate.instant('COMMON.STATUS'),
          type: 'string',
        }
      },
    };
  }


  route(event) {
    this.router.navigate(['pages/user-management/user/', event.data.id]);
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
