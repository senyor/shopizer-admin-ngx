import { Component, OnInit } from '@angular/core';

import { UserService } from '../shared/services/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading = false;
  user = {
    userName: '',
    lastAccess: '',
    merchantName: '',
    address: '',
    city: '',
    stateProvince: '',
    postalCode: '',
    country: '',
    phone: ''
  };
  canAccessToOrder: boolean;

  constructor(
    private userService: UserService
  ) {
    const userId = this.userService.getUserId();
    this.userService.getUser(userId)
      .subscribe(user => {
        this.userService.checkForAccess(user.permissions);
        this.canAccessToOrder = this.userService.roles.canAccessToOrder;
      });
  }

  ngOnInit() {
    this.loading = true;
    const userId = this.userService.getUserId();
    forkJoin(this.userService.getUser(userId), this.userService.getMerchant())
      .subscribe(([user, merchant]) => {
        this.user.userName = user.userName;
        this.user.lastAccess = user.lastAccess;
        this.user.merchantName = merchant.name;
        this.user.address = merchant.address.address;
        this.user.city = merchant.address.city;
        this.user.stateProvince = merchant.address.stateProvince;
        this.user.postalCode = merchant.address.postalCode;
        this.user.country = merchant.address.country;
        this.user.phone = merchant.phone;

        this.loading = false;
      });
  }

}
