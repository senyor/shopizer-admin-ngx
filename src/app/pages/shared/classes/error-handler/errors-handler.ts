import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Injectable()
export class ErrorsHandler implements ErrorHandler {

    constructor(
        private injector: Injector,
        private authService: AuthService
        ) { }

    handleError(error: Error) {
        // Do whatever you like with the error (send it to the server?)
        // And log it to the console

        const router = this.injector.get(Router);
        

        if (error instanceof HttpErrorResponse) {
            // Server or connection error happened
            if (!navigator.onLine) {
              // Handle offline error
              console.log('Error offline ' + error.status);
            } else {
              // Handle Http Error (error.status === 403, 404...)
              console.log('Error status ' + error.status);
              if(error.status === 401) {
                this.authService.logout();
                router.navigate(['/auth']);
              }
            }
         } else {
           // Handle Client Error (Angular Error, ReferenceError...)     
         }


        console.log('Error occured: ', error);
        //router.navigate(['/error']);
        //router.navigate(['/errorPage']);
     }
}
