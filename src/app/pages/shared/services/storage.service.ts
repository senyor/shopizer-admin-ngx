import { Injectable } from '@angular/core';

import { UserService } from './user.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private userService: UserService,
  ) {
  }

  // TODO getting userID from localstorage or server
  getUserId() {
    const userId = localStorage.getItem('userId');
    return userId;
  }

  getMerchant() {
    let merchant = localStorage.getItem('merchant');
    if (!merchant) {
      this.userService.getUser(this.getUserId())
        .subscribe(user => {
          merchant = user.merchant;
          localStorage.setItem('merchant', merchant);
        });
    }
    return merchant;
  }

  getLanguage () {
    return localStorage.getItem('lang') || environment.client.language.default;
  }

}
