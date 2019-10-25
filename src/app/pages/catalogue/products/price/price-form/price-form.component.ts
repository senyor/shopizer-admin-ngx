import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../../../shared/services/config.service';
import * as moment from 'moment';

@Component({
  selector: 'ngx-price-form',
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.scss']
})
export class PriceFormComponent implements OnInit {
  price = {};
  priceId;
  form: FormGroup;
  loader = false;
  languages = [];
  prices = [];
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
    private activatedRoute: ActivatedRoute,
      private fb: FormBuilder,
      private toastr: ToastrService,
      private translate: TranslateService,
      private configService: ConfigService,
  ) {
  }

  ngOnInit() {
    this.priceId = this.activatedRoute.snapshot.paramMap.get('priceId');
    console.log('price', this.priceId);
    this.createForm();
    if (this.priceId) {
      console.log('get price');
    } else {
      console.log('create new');
    }
    this.loader = true;
    this.configService.getListOfSupportedLanguages()
      .subscribe(res => {
        this.languages = [...res];
        this.addFormArray();
        // if (this.product.id) {
        //   this.fillForm();
        // }
        this.loader = false;
      });
  }

  private createForm() {
    this.form = this.fb.group({
      finalPrice: ['', [Validators.required]],
      originalPrice: ['', [Validators.required]],
      discounted: ['', [Validators.required]],
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

  // fillForm() {
  //   this.form.patchValue({
  //     store: this.inventory.store.code,
  //     owner: this.inventory.owner,
  //     dateAvailable: this.inventory.dateAvailable,
  //     quantity: this.inventory.quantity,
  //     selectedLanguage: 'en',
  //   });
  // }

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

  save() {
    // todo create output method
    const priceObject = this.form.value;
    priceObject.dateAvailable = moment(priceObject.dateAvailable).format('YYYY-MM-DD');
    // save important values for filling empty field in result object
    const tmpObj = {
      name: '',
      friendlyUrl: ''
    };
    priceObject.descriptions.forEach((el) => {
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

    if (tmpObj.name === '' || tmpObj.friendlyUrl === '' || priceObject.sku === '') {
      this.toastr.error(this.translate.instant('common.fillRequiredFields'));
    } else {
      priceObject.descriptions.forEach((el) => {
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
      priceObject.descriptions.forEach(el => {
        for (const elKey in el) {
          if (el.hasOwnProperty(elKey)) {
            if (typeof el[elKey] === 'undefined') {
              el[elKey] = '';
            }
          }
        }
      });


      console.log('save', priceObject);
    }
    // const inventoryObj = this.form.value;
    // inventoryObj.dateAvailable = moment(inventoryObj.dateAvailable).format('YYYY-MM-DD');
    // inventoryObj.prices = [...this.prices];
    // inventoryObj.productId = this.productId;
    // console.log(inventoryObj);
    // if (this.inventory.id) {
    //   console.log('update');
    //   // this.inventoryService.updateInventory(this.inventory.id, inventoryObj).subscribe((res) => {
    //   //   console.log(res);
    //   // });
    // } else {
    //   this.inventoryService.createInventory(inventoryObj).subscribe((res) => {
    //     console.log(res);
    //   });
    // }
  }

}
