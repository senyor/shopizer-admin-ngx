import { Injectable } from '@angular/core';

import { CrudService } from '../../shared/services/crud.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private crudService: CrudService) {
  }

  getStore(): Observable<any> {
    return this.crudService.get(`/v1/store/DEFAULT`);
  }

  getListOfStores(): Observable<any> {
    const params = {
      'lenght': '100',
      'start': '0'
    };
    return this.crudService.get(`/v1/private/stores`, params);
  }


}
