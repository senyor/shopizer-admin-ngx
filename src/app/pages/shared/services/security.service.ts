import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor() { }

  isSuperAdmin(): boolean { 
    return (JSON.parse(localStorage.getItem('roles'))).isSuperadmin;
  }

  editAdctions(): [] {
    return null;
  }

  /**
   * Superadmin
   * Admin
   * Retail admin
   */
  isAnAdmin(): boolean {
    //console.log(JSON.parse(localStorage.getItem('roles')));
    if(
      (JSON.parse(localStorage.getItem('roles'))).isSuperadmin ||
      (JSON.parse(localStorage.getItem('roles'))).isAdmin ||
      (JSON.parse(localStorage.getItem('roles'))).isAdminRetail
    ) {
      return true;
    } else  {
      return false;
    }
  }
}
