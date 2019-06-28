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
    isStore: false
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
        if (role.name === elem.name) {
          this.roles.canAccessToOrder = true;
        }
        if (elem.name === 'ADMIN') {
          this.roles.isAdmin = true;
        }
        if (elem.name === 'SUPERADMIN') {
          this.roles.isSuperadmin = true;
        }
        if (elem.name === 'STORE') {
          this.roles.isStore = true;
        }
      });
    });
  }

  getUsersList(): Observable<any> {
    const params = {
      'store': 'DEFAULT',
      'lenght': '100',
      'start': '0'
    };
    return this.crudService.get(`/v1/private/users/`, params);
  }

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
