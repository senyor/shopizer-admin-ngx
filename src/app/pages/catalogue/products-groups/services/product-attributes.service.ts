import { Injectable } from '@angular/core';
import { CrudService } from '../../../shared/services/crud.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductAttributesService {

  constructor(
    private crudService: CrudService
  ) {
  }
  createProductAttribute (productId, attribute): Observable<any> {
    return this.crudService.post(`/v1/private/product/${productId}/attribute`, attribute);
  }

}
