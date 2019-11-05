import { Injectable } from '@angular/core';

import { CrudService } from '../../../shared/services/crud.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  constructor(
    private crudService: CrudService
  ) {
  }

  getListOfOptions(params): Observable<any> {
    return this.crudService.get(`/v1/private/product/options`, params);
  }

  createOption (option): Observable<any> {
    return this.crudService.post(`/v1/private/product/option`, option);
  }

  // updateProductFromTable(id, product): Observable<any> {
  //   return this.crudService.patch(`/v1/private/product/${ id }`, product);
  // }
  //
  // updateProduct(id, product): Observable<any> {
  //   return this.crudService.put(`/v1/private/product/${ id }`, product);
  // }
  //
  // getProductById(id): Observable<any> {
  //   const params = {
  //     lang: '_all'
  //   };
  //   return this.crudService.get(`/v1/product/${ id }`, params);
  // }
  //

  //
  // deleteProduct(id): Observable<any> {
  //   return this.crudService.delete(`/v1/private/product/${ id }`);
  // }
  //
  // getProductTypes(): Observable<any> {
  //   return this.crudService.get(`/v1/products/types`);
  // }
  //
  // checkProductSku(code): Observable<any> {
  //   const params = {
  //     'code': code,
  //   };
  //   return this.crudService.get(`/v1/private/product/unique`, params);
  // }
  //
}
