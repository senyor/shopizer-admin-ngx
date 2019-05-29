import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUserUrl = '/v1/private/login';
  headers: HttpHeaders = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  logon(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}${this.loginUserUrl}`,
      {username, password}, {headers: this.headers});
  }

  logout() {
    localStorage.removeItem('token');
  }

}
