import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminCatalogueGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {

    if (this.userService.roles.isAdminCatalogue) {
      return true;
    }

    this.router.navigate(['home']);
    return false;
  }
}
