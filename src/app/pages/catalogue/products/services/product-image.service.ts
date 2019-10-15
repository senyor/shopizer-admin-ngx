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

  createImage(id, file): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file[]', file, file.name);
    return this.crudService.post(`/v1/private/products/${ id }/images`, uploadData);
  }

}
