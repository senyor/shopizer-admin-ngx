import { Injectable } from '@angular/core';

import { CrudService } from '../../../shared/services/crud.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private crudService: CrudService
  ) {
  }

  getListOfProducts(): Observable<any> {
    const params = {
      'store': 'DEFAULT',
      'lang': 'en',
      'count': '100',
      'start': '0'
    };
    return this.crudService.get(`/v1/products`, params);
  }

  updateProductFromTable(id, product): Observable<any> {
    return this.crudService.patch(`/v1/private/product/${ id }`, product);
  }

  updateProduct(id, product): Observable<any> {
    return this.crudService.put(`/v1/private/category/${ id }`, product);
  }

  getProductById(id): Observable<any> {
    return this.crudService.get(`/v1/product/${ id }`);
  }

}
