import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
  constructor(private userService: UserService) {
    // check access to order page
    this.userService.getUser()
      .subscribe(user => {
        this.userService.checkForAccess(user.permissions);
        if (!this.userService.canAccessToOrder) {
          const index = this.menu.findIndex(el => el.title === 'Orders');
          this.menu.splice(index, 1);
        }
      });

  }

}
