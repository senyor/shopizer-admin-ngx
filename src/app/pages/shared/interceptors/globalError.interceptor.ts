import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      retry(1),
      catchError((error) => {
        let errorMessage = '';
        if (error.status === 404 && req.url.search(/login/gi) !== -1) {
        } else if (error.status !== 401) {
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `${this.translate.instant('COMMON.ERROR')}: ${ error.error.message }`;
          } else {
            // server-side error
            errorMessage = this.translate.instant('COMMON.ERROR_CODE') + `: ${ error.status }\n
            ${this.translate.instant('COMMON.MESSAGE')}: ${ error.message }`;
          }
          this.toastr.error(errorMessage, this.translate.instant('COMMON.ERROR'));
        }
        return throwError(error);
      })
    );
  }
}
