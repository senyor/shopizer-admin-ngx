import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { roles } from '../models/access-roles';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  canAccessToOrder = false;

  constructor(
    private crudService: CrudService
  ) { }

  getUser(): Observable<any>  {
    return this.crudService.get('/v1/private/users/admin');
  }

  getMerchant (): Observable<any>  {
    return this.crudService.get('/v1/store/DEFAULT');
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

}
