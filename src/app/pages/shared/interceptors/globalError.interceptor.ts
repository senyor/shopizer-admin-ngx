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

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      retry(1),
      catchError((error) => {
        let errorMessage = '';
        if (error.status !== 401) {
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${ error.error.message }`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${ error.status }\nMessage: ${ error.message }`;
          }
          this.toastr.error(errorMessage, 'Error');
        }
        return throwError(error);
      })
    );
  }
}
