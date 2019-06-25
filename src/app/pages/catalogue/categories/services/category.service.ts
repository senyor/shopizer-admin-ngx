import { Injectable } from '@angular/core';
import { CrudService } from '../../../shared/services/crud.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private crudService: CrudService) {
  }

  getListOfCategories(): Observable<any> {
    return this.crudService.get(`/v1/category`);
  }

  getCategoryById(id) {
    return this.crudService.get(`/v1/category/${id}`);
  }

}
