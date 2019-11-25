import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminCatalogueGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {

    if (this.userService.roles.isSuperadmin ||
      this.userService.roles.isAdmin ||
      this.userService.roles.isAdminCatalogue) {
      return true;
    }

    this.router.navigate(['home']);
    return false;
  }}
