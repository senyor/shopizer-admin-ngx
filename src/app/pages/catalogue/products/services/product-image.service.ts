import { Injectable } from '@angular/core';

import { CrudService } from '../../../shared/services/crud.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  constructor(
    private crudService: CrudService
  ) {
  }

  createImage(id, product): Observable<any> {
    return this.crudService.post(`/v1/private/products/${ id }/images`, product);
  }

}
