import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent implements OnInit {
  @Input() store: any;

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: this.fb.group({
        stateProvince: [''],
        country: [''],
        address: [''],
        postalCode: [''],
        city: ['']
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
    console.log('save', this.form);
  }

  remove() {
    console.log('remove');
  }


}
