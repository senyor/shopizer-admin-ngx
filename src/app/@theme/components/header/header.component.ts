import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { AuthService } from '../../../pages/auth/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../../pages/shared/services/user.service';

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

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              private authService: AuthService,
              private router: Router) {
    menuService.onItemClick().subscribe((el) => {
      if (el.item.title === 'Log out') {
        this.authService.logout();
        this.router.navigate(['auth']);
      }
    });
  }

  ngOnInit() {
    this.userService.getUser()
      .subscribe((user: any) => {
        this.user = user.firstName + ' ' + user.lastName;
      });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
