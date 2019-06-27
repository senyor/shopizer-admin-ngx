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

  checkIfStoreExist(code): Observable<any> {
    const params = {
      'code': code,
    };
    return this.crudService.get(`/v1/private/store/unique`, params);
  }

  createStore(store: any): Observable<any> {
    return this.crudService.post(`/v1/private/store`, store);
  }

  deleteStore(storeCode: any): Observable<any> {
    return this.crudService.delete(`/v1/private/store/${ storeCode }`);
  }

  updateStore(store: any): Observable<any> {
    return this.crudService.put(`/v1/private/store/${ store.code }`, store);
  }

  // PAGE CONTENT

  getPageContent(code: string, pageCode: string): Observable<any> {
    return this.crudService.get(`/v1/${code}/content/pages/${pageCode}`);
  }

  updatePageContent(code: string, content: any): Observable<any> {
    return this.crudService.post(`/v1/private/${code}/content/pages/${content.code}`, content);
  }

  // end PAGE CONTENT

}
