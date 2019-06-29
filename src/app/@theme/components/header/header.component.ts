import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { LayoutService } from '../../../@core/utils';
import { AuthService } from '../../../pages/auth/services/auth.service';
import { UserService } from '../../../pages/shared/services/user.service';
import { environment } from '../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: string;

  userMenu = [
    { title: 'Profile' },
    { title: 'Log out' }
    ];

  languages = [];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private layoutService: LayoutService,
              private authService: AuthService,
              private router: Router,
              private translate: TranslateService) {

    this.getLanguageArray();
    menuService.onItemClick().subscribe((el) => {
      if (el.item.title === 'Log out') {
        this.authService.logout();
        this.router.navigate(['auth']);
      }
      // language events
      if (el.tag === 'language') {
        this.setLanguage(el.item.title);
      }
    });
  }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    this.userService.getUser(userId)
      .subscribe((user: any) => {
        this.user = user.firstName + ' ' + user.lastName;
      });
  }

  getLanguageArray () {
    environment.client.language.array.forEach(lg => {
      this.languages = [...this.languages, {title: lg}];
    });
  }

  setLanguage (lang) {
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }
}
