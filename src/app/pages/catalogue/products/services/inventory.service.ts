import { Injectable } from '@angular/core';
import { CrudService } from '../../../shared/services/crud.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(
    private crudService: CrudService
  ) {
  }

  getListOfInventories(idProduct, params): Observable<any> {
    return this.crudService.get(`/v1/private/product/${idProduct}/inventory`, params);
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
  //   return this.crudService.get(`/v1/product/${ id }`);
  // }
  //
  // createProduct (product): Observable<any> {
  //   return this.crudService.post(`/v1/private/product`, product);
  // }
  //
  // deleteProduct(id): Observable<any> {
  //   return this.crudService.delete(`/v1/private/product/${ id }`);
  // }
  //
  // getProductTypes(): Observable<any> {
  //   return this.crudService.get(`/v1/products/types`);
  // }

}
