import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { UserService } from './shared/services/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="localedMenu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
  localedMenu = [...this.menu];

  constructor(
    private userService: UserService,
    private translate: TranslateService
  ) {

    const userId = this.userService.getUserId();
    // check access to order page
    this.userService.getUser(userId)
      .subscribe(user => {
        this.userService.checkForAccess(user.permissions);
        if (!this.userService.roles.canAccessToOrder) {
          const indexOrderMenu = this.menu.findIndex(el => el.title === 'sideNav.orders');
          this.menu.splice(indexOrderMenu, 1);
        }
        // check access for admin
        if (!this.userService.roles.isAdmin) {
          const indexUserMenu = this.menu.findIndex(el => el.title === 'sideNav.user');

          const indexCreateUser = this.menu[indexUserMenu].children.findIndex(el => el.title === 'sideNav.createUser');
          this.menu[indexUserMenu].children.splice(indexCreateUser, 1);

          const indexUserList = this.menu[indexUserMenu].children.findIndex(el => el.title === 'sideNav.userList');
          this.menu[indexUserMenu].children.splice(indexUserList, 1);
        }
        // if (!this.userService.isStore) {
        //   const indexStoreMenu = this.menu.findIndex(el => el.title === 'sideNav.store');
        //
        // }
        if (!this.userService.roles.isSuperadmin) {
          const indexStoreMenu = this.menu.findIndex(el => el.title === 'sideNav.store');

          const indexCreateUser = this.menu[indexStoreMenu]
            .children.findIndex(el => el.title === 'sideNav.createStore');
          this.menu[indexStoreMenu].children.splice(indexCreateUser, 1);

          const indexUserList = this.menu[indexStoreMenu]
            .children.findIndex(el => el.title === 'sideNav.storesList');
          this.menu[indexStoreMenu].children.splice(indexUserList, 1);

        }
        this.localedMenu = [...this.menu];
        this.localedMenu = this.translateMenu(this.localedMenu);
      });

    this.translate.onLangChange.subscribe((lang) => {
      this.localedMenu = this.translateMenu(this.localedMenu);
    });
  }

  translateMenu(array) {
    return array.map((el, index) => ({
      ...el,
      title: this.translate.instant(this.menu[index].title),
      children: !el.children ? null : el.children.map((child, childIndex) => ({
        ...child,
        title: this.translate.instant(this.menu[index].children[childIndex].title)
      }))
    }));
  }

}
