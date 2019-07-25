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

  getStore(code): Observable<any> {
    return this.crudService.get(`/v1/store/${code}`);
  }

  getListOfStores(params): Observable<any> {
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
    const params = {
      lang: content.language
    };
    return this.crudService.post(`/v1/private/${code}/content/pages/${content.code}`, content, {params});
  }

  // end PAGE CONTENT

  // start BRANDING

  getBrandingDetails(code): Observable<any> {
    return this.crudService.get(`/v1/private/store/${code}/marketing`);
  }

  updateSocialNetworks(body: any): Observable<any> {
    const code = 'DEFAULT';
    return this.crudService.post(`/v1/private/store/${code}/marketing`, body);
  }

  addStoreLogo(file: any): Observable<any> {
    const code = 'DEFAULT';
    const uploadData = new FormData();
    uploadData.append('file', file, file.name);
    return this.crudService.post(`/v1/private/store/${code}/marketing/logo`, uploadData);
  }

  removeStoreLogo(code: string): Observable<any> {
    return this.crudService.delete(`/v1/private/store/${code}/marketing/logo`);
  }

  // end BRANDING

}
