import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../auth/services/token.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    if (req.url.indexOf('login') === -1) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req)
      .pipe(
        catchError(err => {
          console.log(err);

          if (err instanceof HttpErrorResponse) {
            if ((<HttpErrorResponse>err).status === 401) {
              this.authService.refresh()
                .subscribe(res => {
                  this.tokenService.saveToken(res.token);
                  return next.handle(req.clone({
                    setHeaders: {
                      Authorization: `Bearer ${res.token}`
                    }
                  }));
                });
            }
            if ((<HttpErrorResponse>err).status === 400) {
              this.authService.logout();
            }
          }

          return next.handle(req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          }));
        })
      );
  }

}
