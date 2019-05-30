import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  options;

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get<any>(`${environment.apiUrl}/v1/private/users/admin`);
  }

  getMerchant () {
    return this.http.get<any>(`${environment.apiUrl}/v1/store/DEFAULT`);
  }

}
