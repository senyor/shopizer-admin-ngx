import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, DoCheck {
  path = 'User';
  sidemenuTitle = 'User profile';
  sidemenuValue = 'admin';
  sidemenuLinks = [
    {
      title: 'My profile',
      link: 'profile'
    },
    {
      title: 'Change password',
      link: 'change-password'
    }
  ];
  showSide = true;

  constructor() {
  }

  ngOnInit() {
  }

  ngDoCheck() {
    // this.showSide = window.location.hash.indexOf('stores-list') === -1;
  }

}
