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

  menu = JSON.parse(JSON.stringify(MENU_ITEMS));
  localedMenu = [...this.menu];

  constructor(
    private userService: UserService,
    private translate: TranslateService
  ) {
    this.checkAccess();
    this.translate.onLangChange.subscribe((lang) => {
      this.localedMenu = this.translateMenu(this.localedMenu);
    });
  }

  checkAccess() {
    this.menu = JSON.parse(JSON.stringify(MENU_ITEMS));
    // console.log('before', this.menu);
    const roles = JSON.parse(localStorage.getItem('roles'));
    if (!roles.canAccessToOrder) {
      const indexOrderMenu = this.menu.findIndex(el => el.title === 'sideNav.orders');
      this.menu[indexOrderMenu].hidden = true;
    }
    if (!roles.isAdmin) {
      const indexUserMenu = this.menu.findIndex(el => el.title === 'sideNav.user');

      const indexCreateUser = this.menu[indexUserMenu].children.findIndex(el => el.title === 'sideNav.createUser');
      this.menu[indexUserMenu].children[indexCreateUser].hidden = true;

      const indexUserList = this.menu[indexUserMenu].children.findIndex(el => el.title === 'sideNav.userList');
      this.menu[indexUserMenu].children[indexUserList].hidden = true;
    }
    if (!roles.isSuperadmin) {
      const indexStoreMenu = this.menu.findIndex(el => el.title === 'sideNav.store');

      const indexCreateUser = this.menu[indexStoreMenu]
        .children.findIndex(el => el.title === 'sideNav.createStore');
      this.menu[indexStoreMenu].children[indexCreateUser].hidden = true;

      const indexUserList = this.menu[indexStoreMenu]
        .children.findIndex(el => el.title === 'sideNav.storesList');
      this.menu[indexStoreMenu].children[indexUserList].hidden = true;
    }
    if (!roles.isRetailerAdmin && !roles.isSuperadmin) {
      const indexStoreMenu = this.menu.findIndex(el => el.title === 'sideNav.store');

      const indexRetailer = this.menu[indexStoreMenu]
        .children.findIndex(el => el.title === 'sideNav.retailer');
      this.menu[indexStoreMenu].children[indexRetailer].hidden = true;

      const indexRetailerList = this.menu[indexStoreMenu]
        .children.findIndex(el => el.title === 'sideNav.retailerList');
      this.menu[indexStoreMenu].children[indexRetailerList].hidden = true;


      const indexRetailerCreation = this.menu[indexStoreMenu]
        .children.findIndex(el => el.title === 'sideNav.createRetailer');
      this.menu[indexStoreMenu].children[indexRetailerCreation].hidden = true;
    }
    // console.log('after', this.menu);
    this.localedMenu = [...this.menu];
    this.localedMenu = this.translateMenu(this.localedMenu);
  }

  translateMenu(array) {
    return array.map((el, index) => ({
      ...el,
      title: this.translate.instant(this.menu[index].title),
      children: !el.children ? null : el.children.map((child, childIndex) => ({
        ...child,
        title: this.translate.instant(this.menu[index].children[childIndex].title),
        children: !child.children ? null : child.children.map((ch, chIndex) => ({
          ...ch,
          title: this.translate.instant(this.menu[index].children[childIndex].children[chIndex].title)
        }))
      }))
    }));
  }

}
