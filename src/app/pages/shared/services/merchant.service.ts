import { Injectable } from '@angular/core';

import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(
    private crudService: CrudService
  ) {
  }

  //
  // getMerchants (): Observable<any> {
  //   return this.crudService.get(`/v1/products/users/`);
  // }


}
