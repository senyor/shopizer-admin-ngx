import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { roles } from '../models/access-roles';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  canAccessToOrder = false;
  userIdString = 'userId';

  constructor(
    private crudService: CrudService
  ) { }

  getUser(id: any): Observable<any>  {
    return this.crudService.get(`/v1/private/users/${id}`);
  }

  getMerchant (): Observable<any>  {
    return this.crudService.get(`/v1/store/DEFAULT`);
  }

  // check roles for access to order page
  checkForAccess (array) {
    roles.forEach(role => {
      array.forEach(elem => {
        if (role.name === elem.name) {
          this.canAccessToOrder = true;
        }
      });
    });
  }

  getUserId(): string {
    return localStorage.getItem(this.userIdString);
  }

  saveUserId(id: string) {
    localStorage.setItem(this.userIdString, id);
  }

  destroyUserId () {
    localStorage.removeItem(this.userIdString);
  }

}
