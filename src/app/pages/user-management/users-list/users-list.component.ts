import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../shared/services/user.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @ViewChild('item') accordion;
  source: LocalDataSource = new LocalDataSource();
  path = 'User';
  showUserDetails = false;
  user = {};

  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.userService.getUsersList()
      .subscribe(users => {
        const usersArray = [...users.data];

        // remove current user from list
        const index = usersArray.findIndex(el => el.id === +this.userService.getUserId());
        usersArray.splice(index, 1);

        // create 'name' property for displaying in the table
        usersArray.map(user => {
          user.name = user.firstName + ' ' + user.lastName;
          return user;
        });

        this.source.load(usersArray);

        // open accordion tab
        this.accordion.toggle();
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

  route(e) {
    this.showUserDetails = true;
    this.user = e.data;
  }

  backToList() {
    this.showUserDetails = false;
    this.cdr.detectChanges();
    this.accordion.toggle();
  }

}
