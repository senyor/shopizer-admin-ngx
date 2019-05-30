import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  options;

  constructor(private http: HttpClient) { }

  getUser(): Observable<any>  {
    return this.http.get(`${environment.apiUrl}/v1/private/users/admin`);
  }

  getMerchant (): Observable<any>  {
    return this.http.get(`${environment.apiUrl}/v1/store/DEFAULT`);
  }

}
