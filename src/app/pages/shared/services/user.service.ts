import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { roles } from '../models/access-roles';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  userIdString = 'userId';
  roles = {
    canAccessToOrder: false,
    isAdmin: false,
    isSuperadmin: false,
    isStore: false,
    isProduct: false,
    isRetailerAdmin: false,
  };

  constructor(
    private crudService: CrudService
  ) {
  }

  getUser(id: any): Observable<any> {
    return this.crudService.get(`/v1/private/users/${ id }`);
  }

  checkIfUserExist(userName): Observable<any> {
    const body = {
      unique: userName,
      merchant: ''
    };
    return this.crudService.post(`/v1/private/user/unique`, body);
  }

  getMerchant(): Observable<any> {
    const storeCode = 'DEFAULT';
    return this.crudService.get(`/v1/store/${storeCode}`);
  }

  // check roles for access to order page
  checkForAccess(array) {
    roles.forEach(role => {
      array.forEach(elem => {
        switch (elem.name) {
          case 'ADMIN':
            this.roles.isAdmin = true;
            break;
          case 'SUPERADMIN':
            this.roles.isSuperadmin = true;
            break;
          case 'STORE':
            this.roles.isStore = true;
            break;
          case 'PRODUCTS':
            this.roles.isProduct = true;
            break;
          case 'ADMIN_RETAIL':
            this.roles.isRetailerAdmin = true;
            break;
          case role.name:
            this.roles.canAccessToOrder = true;
            break;
        }
      });
    });
  }

  getUsersList(params): Observable<any> {
    return this.crudService.get(`/v1/private/users/`, params);
  }
  // createUser(user: any, params): Observable<any> {
  //   return this.crudService.post(`/v1/private/${params}/user/`, user);
  // }
  createUser(user: any): Observable<any> {
    const params = {
      'store': 'DEFAULT'
    };
    return this.crudService.post(`/v1/private/user/`, user, { params });
  }

  updateUser(id: any, user: any): Observable<any> {
    const params = {
      'store': 'DEFAULT'
    };
    return this.crudService.put(`/v1/private/user/${ id }`, user, { params });
  }

  deleteUser(id: any): Observable<any> {
    const params = {
      'store': 'DEFAULT'
    };
    return this.crudService.delete(`/v1/private/users/${ id }`, { params });
  }

  updatePassword(id: any, passwords: any): Observable<any> {
    return this.crudService.put(`/v1/private/user/${ id }/password`, passwords);
  }

  getUserId(): string {
    return localStorage.getItem(this.userIdString);
  }

  saveUserId(id: string) {
    localStorage.setItem(this.userIdString, id);
  }

  destroyUserId() {
    localStorage.removeItem(this.userIdString);
  }

}
