import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfigService } from '../../shared/services/config.service';

@Component({
  selector: 'ngx-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent implements OnInit {
  @Input() store: any;
  supportedLanguages = [];
  supportedCurrency = [];
  weightList = [];
  sizeList = [];
  flag = true;
  provinces = [];
  countries = [];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.configService.getListOfCountries()
      .subscribe(countries => {
        this.countries = [...countries];
      });
    this.configService.getListOfSupportedLanguages()
      .subscribe(languages => {
        this.supportedLanguages = [...languages];
      });
    this.configService.getListOfSupportedCurrency()
      .subscribe(currencies => {
        this.supportedCurrency = [...currencies];
      });
    this.configService.getWeightAndSizes()
      .subscribe(measures => {
        this.weightList = [...measures.weights];
        this.sizeList = [...measures.measures];
      });
  }

  private createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: this.fb.group({
        stateProvince: ['', [Validators.required]],
        country: ['', [Validators.required]],
        address: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        city: ['', [Validators.required]]
      }),
      supportedLanguages: ['', [Validators.required]],
      defaultLanguage: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      currencyFormatNational: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      dimension: ['', [Validators.required]],
      inBusinessSince: ['', [Validators.required]],
      useCache: ['', [Validators.required]],
    });
  }

  save() {
    this.form.controls['address'].patchValue({ country: this.form.value.address.country.code });
    console.log('save', this.form.value);
  }

  remove() {
    console.log('remove');
  }

  countryIsSelected(event) {
    if (event.zones.length !== 0) {
      this.configService.getListOfZonesProvincesByCountry(event.code)
        .subscribe(provinces => {
          this.provinces = [...provinces];
        });
    }
  }

  addSupportedLanguage(languageCode) {
    let newLanguages = this.form.value.supportedLanguages ? [...this.form.value.supportedLanguages] : [];
    // check if element is exist in array
    const index = newLanguages.indexOf(languageCode);
    // if exist
    if (index === -1) {
      newLanguages = [...newLanguages, languageCode]; // add
    } else {
      newLanguages.splice(index, 1); // remove
    }
    this.form.patchValue({ 'supportedLanguages': newLanguages }); // rewrite form
  }


}
