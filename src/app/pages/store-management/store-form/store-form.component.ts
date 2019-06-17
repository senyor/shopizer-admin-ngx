import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ConfigService } from '../../shared/services/config.service';
import { MapsAPILoader } from '@agm/core';
import { environment } from '../../../../environments/environment';
import { StoreService } from '../services/store.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'ngx-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent implements OnInit, OnChanges {
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
  componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    administrative_area_level_2: 'short_name',
    country: 'short_name',
    postal_code: 'short_name',
    sublocality_level_1: 'long_name'
  };
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  loading = false;
  showRemoveButton = true;

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private storeService: StoreService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private router: Router
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.store.currentValue && changes.store.currentValue.id) {
      if (this.store.id && this.userService.isSuperadmin && this.store.code !== 'DEFAULT') {
        this.showRemoveButton = false;
      }
      this.loading = true;
      this.fillForm();
    }
  }


  addressAutocomplete() {
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {

          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.address_components) {
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
            // rewrite form
            this.form.controls['address'].patchValue({ postalCode: obj.postal_code });
            this.form.controls['address'].patchValue({ country: obj.country });
            this.form.controls['address'].patchValue({ stateProvince: obj.administrative_area_level_1 });
            this.form.controls['address'].patchValue({ city: obj.locality });
            this.form.controls['address'].patchValue({ address: obj.route + ' ' + obj.street_number });
            if (obj.country) {
              this.countryIsSelected(obj.country);
            }
            this.cdr.markForCheck();
          } else {
            console.log('choose from list');
          }
        });
      });
    });
  }

  private createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      code: [{ value: '', disabled: false }, [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      address: this.fb.group({
        searchControl: [''],
        stateProvince: [{ value: '', disabled: true }],
        country: ['', [Validators.required]],
        address: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        city: ['', [Validators.required]]
      }),
      supportedLanguages: [[], [Validators.required]],
      defaultLanguage: [''],
      currency: [''],
      currencyFormatNational: [true],
      weight: [''],
      dimension: [''],
      inBusinessSince: [''],
      useCache: [false],
    });
  }

  fillForm() {
    this.form.patchValue({
      name: this.store.name,
      code: this.store.code,
      phone: this.store.phone,
      email: this.store.email,
      supportedLanguages: this.store.supportedLanguages,
      defaultLanguage: this.store.defaultLanguage,
      currency: this.store.currency,
      currencyFormatNational: this.store.currencyFormatNational,
      weight: this.store.weight,
      dimension: this.store.dimension,
      inBusinessSince: this.store.inBusinessSince,
      useCache: this.store.useCache,
    });
    this.form.controls['address'].patchValue({ searchControl: '' });
    this.form.controls['address'].patchValue({ stateProvince: this.store.address.stateProvince }, { disabled: false });
    this.form.controls['address'].patchValue({ country: this.store.address.country });
    this.form.controls['address'].patchValue({ address: this.store.address.address });
    this.form.controls['address'].patchValue({ postalCode: this.store.address.postalCode });
    this.form.controls['address'].patchValue({ city: this.store.address.city });
    if (this.store.address.country) {
      this.countryIsSelected(this.store.address.country);
    }
    this.cdr.markForCheck();
    this.loading = false;
  }

  get name() {
    return this.form.get('name');
  }

  get code() {
    return this.form.get('code');
  }

  get phone() {
    return this.form.get('phone');
  }

  get address() {
    return this.form.get('address').get('address');
  }

  get stateProvince() {
    return this.form.get('address').get('stateProvince');
  }

  get country() {
    return this.form.get('address').get('country');
  }

  get city() {
    return this.form.get('address').get('city');
  }

  get postalCode() {
    return this.form.get('address').get('postalCode');
  }

  get email() {
    return this.form.get('email');
  }

  get inBusinessSince() {
    return this.form.get('inBusinessSince');
  }

  save() {
    this.form.controls['address'].patchValue({ country: this.form.value.address.country });
    if (this.store.id) {
      this.storeService.updateStore(this.form.value)
        .subscribe(store => {
          console.log(store);
        });
    } else {
      this.storeService.checkIfStoreExist(this.form.value.code)
        .subscribe(res => {
          if (res.exist) {
            console.log('this code already exist');
          } else {
            this.storeService.createStore(this.form.value)
              .subscribe(store => {
                console.log(store);
                this.router.navigate(['pages/store-management/stores-list']);
              });
          }
        });
    }
  }

  remove() {
    this.storeService.deleteStore(this.store.code)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['pages/store-management/stores-list']);
      });
  }

  countryIsSelected(code) {
    this.provinces = [];
    this.stateProvince.disable();
    this.configService.getListOfZonesProvincesByCountry(code)
      .subscribe(provinces => {
        this.provinces = [...provinces];
        if (this.provinces.length > 0) {
          this.stateProvince.enable();
        }
      }, error1 => {
      });
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

  userHasSupportedLanguage(language) {
    if (!this.store || !this.store.supportedLanguages) return false;
    return this.store.supportedLanguages.find((l: any) => l === language.code);
  }

}
