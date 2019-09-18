import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { CrudService } from '../../shared/services/crud.service';
import { UserService } from '../../shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUserUrl = '/v1/private/login';

  constructor(
    private tokenService: TokenService,
    private crudService: CrudService,
    private userService: UserService
  ) {
  }

  login(username: string, password: string): Observable<any> {
    return this.crudService.post(this.loginUserUrl, { username, password });
  }

  logout() {
    this.tokenService.destroyToken();
    this.userService.destroyUserId();
    this.userService.roles = {
      canAccessToOrder: false,
      isAdmin: false,
      isSuperadmin: false,
      isStore: false,
      isProduct: false,
      isRetailerAdmin: false,
    };
  }

  refresh(): Observable<any> {
    return this.crudService.get('/v1/auth/refresh');
  }

}
