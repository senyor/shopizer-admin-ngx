import { Injectable } from '@angular/core';

import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  languages = [];

  constructor(
    private crudService: CrudService
  ) {
  }

  getListOfSupportedLanguages() {
    return this.crudService.get(`/v1/languages`);
  }

  getListOfSupportedLanguages1() {
    return this.crudService.get(`/v1/languages`).subscribe((languages) => {
      this.languages = [...languages];
      // console.log(this.languages);
    });
  }

  getListOfGroups() {
    return this.crudService.get(`/v1/sec/private/groups`);
  }

  getListOfCountries() {
    return this.crudService.get(`/v1/country`);
  }

  getListOfZonesProvincesByCountry(countryCode) {
    const params = {
      'code': countryCode,
    };
    return this.crudService.get(`/v1/zones`, params);
  }

  getListOfSupportedCurrency() {
    return this.crudService.get(`/v1/currency`);
  }

  getWeightAndSizes() {
    return this.crudService.get(`/v1/measures`);
  }

  getSiteConfig() {
    return this.crudService.get(`/v1/config`);
  }

}
