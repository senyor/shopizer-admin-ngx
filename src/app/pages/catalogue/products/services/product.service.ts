import { Injectable } from '@angular/core';
import { CrudService } from '../../../shared/services/crud.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private crudService: CrudService
  ) { }


  getListOfProducts(): Observable<any> {
    const params = {
      'store': 'DEFAULT',
      'lang': 'en',
      'count': '100',
      'start': '0'
    };
    return this.crudService.get(`/v1/products`, params);
  }

}
