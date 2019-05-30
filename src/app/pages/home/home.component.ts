import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
    forkJoin(this.userService.getUser(), this.userService.getMerchant())
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
      });
  }

}
