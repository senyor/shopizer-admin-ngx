import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ConfigService } from '../../shared/services/config.service';
import { MapsAPILoader } from '@agm/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent implements OnInit {
  @Input() store: any;
  @ViewChild('search')
  searchElementRef: ElementRef;

  supportedLanguages = [];
  supportedCurrency = [];
  weightList = [];
  sizeList = [];
  flag = true;
  provinces = [];
  countries = [];
  form: FormGroup;
  env = environment;
  searchControl: FormControl;
  componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    administrative_area_level_2: 'short_name',
    country: 'long_name',
    postal_code: 'short_name',
    sublocality_level_1: 'long_name'
  };

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
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

    if (this.env.googleApiKey) {
      this.addressAutocomplete();
    }
  }

  addressAutocomplete() {
    // create search FormControl
    this.searchControl = new FormControl();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {

          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          const obj = {
            street_number: '',
            route: '',
            locality: '',
            administrative_area_level_1: '',
            administrative_area_level_2: '',
            sublocality_level_1: '',
            country: '',
            postal_code: '',
          };

          for (let i = 0; i < place.address_components.length; i++) {
            const addressType = place.address_components[i].types[0];
            if (this.componentForm[addressType]) {
              obj[addressType] = place.address_components[i][this.componentForm[addressType]];
            }
          }
          // console.log(obj);
          // rewrite form
          // this.form.controls['address'].patchValue({ postalCode: obj.postal_code });
          // this.form.controls['address'].patchValue({ address: obj.street_number });
        });
      });
    });
  }

  private createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      code: [{ value: '', disabled: false }, [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: this.fb.group({
        stateProvince: [{ value: '', disabled: true }],
        country: ['', [Validators.required]],
        address: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        city: ['', [Validators.required]]
      }),
      supportedLanguages: [[], [Validators.required]],
      defaultLanguage: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      currencyFormatNational: [false],
      weight: ['', [Validators.required]],
      dimension: ['', [Validators.required]],
      inBusinessSince: ['', [Validators.required]],
      useCache: [false],
    });
  }

  get stateProvince() {
    return this.form.get('address').get('stateProvince');
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
          this.stateProvince.enable();
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
