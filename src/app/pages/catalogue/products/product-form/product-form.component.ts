import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ManufactureService } from '../../../shared/services/manufacture.service';
import { ConfigService } from '../../../shared/services/config.service';

@Component({
  selector: 'ngx-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() product;
  form: FormGroup;
  loader = false;
  manufacturers = [];
  languages = [];

  constructor(
    private fb: FormBuilder,
    private manufactureService: ManufactureService,
    private configService: ConfigService,
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.manufactureService.getManufacturers()
      .subscribe(res => {
        this.manufacturers = [...res];
      });
    this.configService.getListOfSupportedLanguages()
      .subscribe(res => {
        this.languages = [...res];
        this.createForm();
        this.addFormArray();
        // if (this.category.id) {
        //   this.fillForm();
        // }
        // this.loader = false;
      });
  }

  private createForm() {
    this.form = this.fb.group({
      // uniqueCode: ['', [Validators.required]], // ???
      sku: ['', [Validators.required]],
      available: [false, [Validators.required]],
      preOrder: [false, [Validators.required]],
      dateAvailable: ['', [Validators.required]],
      manufacturer: ['', [Validators.required]],  // ???
      // productType: [0, [Validators.required]], // ???
      price: [0, [Validators.required]],
      quantity: [0, [Validators.required]],
      sortOrder: [0, [Validators.required]],
      productShipeable: [false, [Validators.required]],
      // dimensions: [0, [Validators.required]],  // ???
      // placementOrder: [0, [Validators.required]],  // ???
      // image: [0, [Validators.required]],  // ???
      // taxClass: [0, [Validators.required]], // ???
      descriptions: this.fb.array([]),
    });
  }

  addFormArray() {
    const control = <FormArray>this.form.controls.descriptions;
    this.languages.forEach(lang => {
      control.push(
        this.fb.group({
          language: [lang.code, [Validators.required]],
          name: ['', [Validators.required]],
          highlights: [''],
          friendlyUrl: ['', [Validators.required]],
          description: [''],
          title: [''],
          keyWords: [''],
          metaDescription: [''],
        })
      );
    });
  }

  save() {
    console.log(this.form.value);
  }

}
