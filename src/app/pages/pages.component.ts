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

    this.localedMenu = this.translateMenu(this.localedMenu);

    this.translate.onLangChange.subscribe((lang) => {
      this.localedMenu = this.translateMenu(this.localedMenu);
    });

    const userId = this.userService.getUserId();
    // check access to order page
    this.userService.getUser(userId)
      .subscribe(user => {
        this.userService.checkForAccess(user.permissions);
        if (!this.userService.canAccessToOrder) {
          const index = this.menu.findIndex(el => el.title === 'Orders');
          this.menu.splice(index, 1);
        }
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
