import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { roles } from '../models/access-roles';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  canAccessToOrder = false;

  constructor(private http: HttpClient) { }

  getUser(): Observable<any>  {
    return this.http.get(`${environment.apiUrl}/v1/private/users/admin`);
  }

  getMerchant (): Observable<any>  {
    return this.http.get(`${environment.apiUrl}/v1/store/DEFAULT`);
  }

  // check roles for access to order page
  checkForAccess (array) {
    // roles.forEach(role => {
    //   array.forEach(elem => {
    //     if (role.name === elem.name) {
    //       this.canAccessToOrder = true;
    //     }
    //   });
    // });
  }

}
