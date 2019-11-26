import { Injectable } from '@angular/core';

import { CrudService } from '../../../shared/services/crud.service';
import { Observable } from 'rxjs';
import { StorageService } from '../../../shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private crudService: CrudService,
    private storageService: StorageService,
  ) {
  }

  getListOfProducts(params): Observable<any> {
    return this.crudService.get(`/v1/products`, params);
  }

  updateProductFromTable(id, product): Observable<any> {
    return this.crudService.patch(`/v1/private/product/${ id }`, product);
  }

  updateProduct(id, product): Observable<any> {
    return this.crudService.put(`/v1/private/product/${ id }`, product,
      {params: {store: this.storageService.getMerchant()}});
  }

  getProductById(id): Observable<any> {
    const params = {
      lang: '_all'
    };
    return this.crudService.get(`/v1/product/${ id }`, params);
  }

  createProduct (product): Observable<any> {
    return this.crudService.post(`/v1/private/product`, product, {params: {store: this.storageService.getMerchant()}});
  }

  deleteProduct(id): Observable<any> {
    return this.crudService.delete(`/v1/private/product/${ id }`);
  }

  getProductTypes(): Observable<any> {
    return this.crudService.get(`/v1/products/types`);
  }

  checkProductSku(code): Observable<any> {
    const params = {
      'code': code,
    };
    return this.crudService.get(`/v1/private/product/unique`, params);
  }

}
