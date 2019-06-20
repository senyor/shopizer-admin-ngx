import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, from, Observable } from 'rxjs';
import { _throw } from 'rxjs-compat/observable/throw';
import { TokenService } from '../../auth/services/token.service';
import { catchError, finalize, switchMap, take, filter } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.tokenService.getToken();
    const chechReq = req.url.indexOf('login') === -1 ? this.addTokenToRequest(req, token) : req;
    return next.handle(chechReq)
      .pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse) {

            if (err.status === 0 || err.status === 401) {
              return this.handle401Error(req, next);
            }
            return _throw(err);
          } else {
            return _throw(err);
          }
        })
      );
  }


  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    const headers = {
      Authorization: `Bearer ${ token }`
    };
    return request.clone({ setHeaders: headers });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      this.tokenSubject.next(null);

      return <Observable<HttpEvent<any>>>from(this.authService.refresh())
        .pipe(
          switchMap((res: any) => {
            const tokenObj = res.token;
            this.tokenSubject.next(res.token);
            this.tokenService.saveToken(res.token);
            return next.handle(this.addTokenToRequest(request, tokenObj));
          }),
          catchError(err => {
            return from(<any>this.authService.logout());
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          })
        );
    } else {
      this.isRefreshingToken = false;

      return this.tokenSubject
        .pipe(filter(token => token != null),
          take(1),
          switchMap(token => {
            return next.handle(this.addTokenToRequest(request, token));
          }));
    }
  }


}
