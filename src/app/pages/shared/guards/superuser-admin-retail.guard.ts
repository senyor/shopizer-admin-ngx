import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class SuperuserAdminRetailGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {

    const roles = JSON.parse(localStorage.getItem('roles'));

    if (roles.isSuperadmin || roles.isAdmin || roles.isAdminRetail) {
      return true;
    }

    this.router.navigate(['home']);
    return false;
  }
}
