import { Injectable } from '@angular/core';

import { CrudService } from '../../../shared/services/crud.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductGroupsService {
  constructor(
    private crudService: CrudService
  ) {
  }

  // TODO
  // checkGroupCode(code): Observable<any> {
  //   const params = {
  //     'code': code,
  //   };
  //   return this.crudService.get(`/v1/private/product/unique`, params);
  // }

  createProductGroup (group): Observable<any> {
    return this.crudService.post(`/v1/private/products/group`, group);
  }

}
