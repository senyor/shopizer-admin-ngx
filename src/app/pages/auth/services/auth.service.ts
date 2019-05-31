import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUserUrl = '/v1/private/login';
  headers: HttpHeaders = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
  }

  logon(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}${this.loginUserUrl}`,
      {username, password}, {headers: this.headers});
  }

  logout() {
    this.tokenService.destroyToken();
  }

  refresh(): Observable<any>  {
    return this.http.get(`${environment.apiUrl}/v1/auth/refresh`);
  }

}
