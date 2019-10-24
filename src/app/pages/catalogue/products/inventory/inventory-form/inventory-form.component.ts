import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { StoreService } from '../../../../store-management/services/store.service';
import { ConfigService } from '../../../../shared/services/config.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent implements OnInit {
  @Input() inventory;
  form: FormGroup;
  stores = [];
  loader = false;
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
  productId;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    // private router: Router,
    private translate: TranslateService,
    private storeService: StoreService,
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.paramMap.get('productId');
    this.createForm();
    this.storeService.getListOfStores({})
      .subscribe(res => {
        res.data.forEach((store) => {
          this.stores.push({ value: store.code, label: store.code });
        });
      });
    this.loader = true;
    this.configService.getListOfSupportedLanguages()
      .subscribe(res => {
        this.languages = [...res];
        this.createForm();
        this.addFormArray();
        if (this.inventory.id) {
          this.fillForm();
        }
        this.loader = false;
      });
  }

  private createForm() {
    this.form = this.fb.group({
      store: ['DEFAULT', [Validators.required]],
      owner: ['', [Validators.required]],
      // price: [0, [Validators.required]],
      quantity: [0, [Validators.required]],
      prices: this.fb.group({
        finalPrice: [0, [Validators.required]],
        originalPrice: [0, [Validators.required]],
        selectedLanguage: ['', [Validators.required]],
        descriptions: this.fb.array([]),
      }),
    });
  }

  addFormArray() {
    const control = <FormArray>this.form.get('prices').get('descriptions');
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
      store: this.inventory.store,
      owner: this.inventory.owner,
      // price: this.inventory.price,
      quantity: this.inventory.quantity,
    });
    const prices = {
      finalPrice: this.inventory.prices.finalPrice,
      originalPrice: this.inventory.prices.originalPrice,
      selectedLanguage: 'en',
      descriptions: [],
    };
    this.form.patchValue({ prices: prices });
    this.fillFormArray();
  }

  fillFormArray() {
    this.form.value.prices.descriptions.forEach((desc, index) => {
      this.inventory.descriptions.forEach((description) => {
        if (desc.language === description.language) {
          (<FormArray>this.form.get('prices').get('descriptions')).at(index).patchValue({
            language: description.language,
            name: description.name,
            highlights: description.highlights,
            friendlyUrl: description.friendlyUrl,
            description: description.description,
            title: description.title,
            keyWords: description.keyWords,
            metaDescription: description.metaDescription,
          });
        }
      });
    });
  }

  get selectedLanguage() {
    return this.form.get('prices').get('selectedLanguage');
  }

  get descriptions(): FormArray {
    return <FormArray>this.form.get('prices').get('descriptions');
  }

  changeName(event, index) {
    (<FormArray>this.form.get('prices').get('descriptions')).at(index).patchValue({
      friendlyUrl: this.slugify(event)
    });
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

  save() {
    const inventoryObject = { ...this.form.value };
    inventoryObject.projectId = this.productId;
    console.log(inventoryObject);

    // save important values for filling empty field in result object
    const tmpObj = {
      name: '',
      friendlyUrl: ''
    };
    inventoryObject.prices.descriptions.forEach((el) => {
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
    if (tmpObj.name === '' || tmpObj.friendlyUrl === '' || inventoryObject.sku === '') {
      this.toastr.error(this.translate.instant('common.fillRequiredFields'));
    } else {
      inventoryObject.prices.descriptions.forEach((el) => {
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
      inventoryObject.prices.descriptions.forEach(el => {
        for (const elKey in el) {
          if (el.hasOwnProperty(elKey)) {
            if (typeof el[elKey] === 'undefined') {
              el[elKey] = '';
            }
          }
        }
      });

      console.log('save', inventoryObject);
      console.log('save string', JSON.stringify(inventoryObject));
      if (this.inventory.id) {
        console.log('update');
      } else {
        console.log('create');
      }
    }
  }

}
