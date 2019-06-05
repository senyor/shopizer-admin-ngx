import { Injectable } from '@angular/core';

import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private crudService: CrudService
  ) {
  }

  getListOfSupportedLanguages() {
    return this.crudService.get(`/v1/languages`);
  }

  getListOfGroups() {
    return this.crudService.get(`/v1/services/private/groups`);
  }

}
