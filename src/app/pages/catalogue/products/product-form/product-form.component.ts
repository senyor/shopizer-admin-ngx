import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ManufactureService } from '../../../shared/services/manufacture.service';
import { ConfigService } from '../../../shared/services/config.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../services/product.service';

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
  config = {
    placeholder: '',
    tabsize: 2,
    height: 300,
    uploadImagePath: '',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  };

  constructor(
    private fb: FormBuilder,
    private manufactureService: ManufactureService,
    private configService: ConfigService,
    private toastr: ToastrService,
    private productService: ProductService
  ) {
  }

  ngOnInit() {
    console.log(this.product);
    this.createForm();
    this.manufactureService.getManufacturers()
      .subscribe(res => {
        this.manufacturers = [...res];
      });
    this.loader = true;
    this.configService.getListOfSupportedLanguages()
      .subscribe(res => {
        this.languages = [...res];
        this.createForm();
        this.addFormArray();
        if (this.product.id) {
          this.fillForm();
        }
        this.loader = false;
      });
  }

  private createForm() {
    this.form = this.fb.group({
      // uniqueCode: ['', [Validators.required]], // ???
      sku: ['', [Validators.required]],
      available: [false],
      preOrder: [false],
      dateAvailable: [new Date()],
      manufacturer: ['DEFAULT'],
      // productType: [0, [Validators.required]], // ???
      price: [0],
      quantity: [0, [Validators.required]],
      sortOrder: [0, [Validators.required]],
      productShipeable: [false, [Validators.required]],
      productSpecifications: this.fb.group({
        weight: [0],
        height: [0],
        width: [0],
        length: [0],
      }),
      // placementOrder: [0, [Validators.required]],  // ???
      // image: [0, [Validators.required]],  // ???
      // taxClass: [0, [Validators.required]], // ???
      selectedLanguage: ['', [Validators.required]],
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

  fillForm() {
    this.form.patchValue({
      // uniqueCode: ['', [Validators.required]], // ???
      sku: this.product.sku,
      available: this.product.available,
      preOrder: this.product.preOrder,
      dateAvailable: this.product.dateAvailable,
      manufacturer: this.product.manufacturer.code,
      // productType: [0, [Validators.required]], // ???
      price: this.product.price,
      quantity: this.product.quantity,
      sortOrder: this.product.sortOrder,
      productShipeable: this.product.productShipeable,
      // placementOrder: [0, [Validators.required]],  // ???
      // image: [0, [Validators.required]],  // ???
      // taxClass: [0, [Validators.required]], // ???
      selectedLanguage: 'en',
      descriptions: [],
    });
    this.fillFormArray();
    const dimension = {
      weight: this.product.productSpecifications.weight,
      height: this.product.productSpecifications.height,
      width: this.product.productSpecifications.width,
      length: this.product.productSpecifications.length,
    };
    this.form.patchValue({ productSpecifications: dimension });
  }

  fillFormArray() {
    this.form.value.descriptions.forEach((desc, index) => {
      if (desc.language === 'en') {
        (<FormArray>this.form.get('descriptions')).at(index).patchValue({
          language: this.form.value.selectedLanguage,
          name: this.product.description.name,
          highlights: this.product.description.highlights,
          friendlyUrl: this.product.description.friendlyUrl,
          description: this.product.description.description,
          title: this.product.description.title,
          keyWords: this.product.description.keyWords,
          metaDescription: this.product.description.metaDescription,
        });
      }
    });
  }

  get selectedLanguage() {
    return this.form.get('selectedLanguage');
  }

  get descriptions(): FormArray {
    return <FormArray>this.form.get('descriptions');
  }

  slugify(string) {
    const a = 'àáäâãåăæąçćčđèéėëêęǵḧìíïîįłḿǹńňñòóöôœøṕŕřßśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;';
    const b = 'aaaaaaaaacccdeeeeeeghiiiiilmnnnnooooooprrssssttuuuuuuuuuwxyyzzz------';
    const p = new RegExp(a.split('').join('|'), 'g');

    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }

  changeName(event, index) {
    (<FormArray>this.form.get('descriptions')).at(index).patchValue({
      friendlyUrl: this.slugify(event)
    });
  }

  onImageChanged(event) {
    console.log('event', event);
  }


  save() {
    const productObject = this.form.value;
    productObject.dateAvailable = moment(productObject.dateAvailable).format('YYYY-MM-DD');


    // const manufacturerObject = this.manufacturers.find((el) => el.code === productObject.manufacturer);
    // console.log(manufacturerObject);
    // productObject.manufacturer = manufacturerObject;

    // save important values for filling empty field in result object
    const tmpObj = {
      name: '',
      friendlyUrl: ''
    };
    productObject.descriptions.forEach((el) => {
      if (tmpObj.name === '' && el.name !== '') {
        tmpObj.name = el.name;
      }
      if (tmpObj.friendlyUrl === '' && el.friendlyUrl !== '') {
        tmpObj.friendlyUrl = el.friendlyUrl;
      }
      for (const elKey in el) {
        if (el.hasOwnProperty(elKey)) {
          if (!tmpObj.hasOwnProperty(elKey) && el[elKey] !== '') {
            tmpObj[elKey] = el[elKey];
          }
        }
      }
    });

    // check required fields
    if (tmpObj.name === '' || tmpObj.friendlyUrl === '' || productObject.sku === '') {
      this.toastr.error('Please, fill required fields.', 'Error');
    } else {
      productObject.descriptions.forEach((el) => {
        // fill empty fields
        for (const elKey in el) {
          if (el.hasOwnProperty(elKey)) {
            if (el[elKey] === '' && tmpObj[elKey] !== '') {
              el[elKey] = tmpObj[elKey];
            }
          }
        }
      });
      // check for undefined
      productObject.descriptions.forEach(el => {
        for (const elKey in el) {
          if (el.hasOwnProperty(elKey)) {
            if (typeof el[elKey] === 'undefined') {
              el[elKey] = '';
            }
          }
        }
      });
      console.log('saving', productObject);

      // if (this.product.id) {
      //   // updating
      // } else {
      //   // creating
      //   this.productService.createProduct(productObject)
      //     .subscribe(res => {
      //       console.log(res);
      //     });
      // }
    }
  }

}
