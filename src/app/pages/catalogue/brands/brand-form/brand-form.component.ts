import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BrandService } from '../services/brand.service';
import { ConfigService } from '../../../shared/services/config.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent implements OnInit {
  @Input() brand;
  form: FormGroup;
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
  isCodeUnique = true;

  constructor(
    private brandService: BrandService,
    private fb: FormBuilder,
    private configService: ConfigService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.loader = true;
    this.configService.getListOfSupportedLanguages()
      .subscribe(res => {
        this.languages = [...res];
        this.createForm();
        this.addFormArray();
        if (this.brand.id) {
          this.fillForm();
        }
        this.loader = false;
      });
  }

  createForm() {
    this.form = this.fb.group({
      code: ['', [Validators.required]],
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
      code: this.brand.code,
      selectedLanguage: 'en',
      descriptions: [],
    });
    this.fillFormArray();
  }

  fillFormArray() {
    this.form.value.descriptions.forEach((desc, index) => {
      this.brand.descriptions.forEach((description) => {
        if (desc.language === description.language) {
          (<FormArray>this.form.get('descriptions')).at(index).patchValue({
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


  get code() {
    return this.form.get('code');
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

  checkCode(event) {
    const code = event.target.value;
    this.brandService.checkCategoryCode(code)
      .subscribe(res => {
        this.isCodeUnique = !(res.exists && (this.brand.code !== code));
      });
  }

  save() {
    const brandObject = this.form.value;
    // save important values for filling empty field in result object
    const tmpObj = {
      name: '',
      friendlyUrl: ''
    };
    brandObject.descriptions.forEach((el) => {
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
    if (tmpObj.name === '' || tmpObj.friendlyUrl === '' || brandObject.code === '') {
      this.toastr.error(this.translate.instant('common.fillRequiredFields'));
    } else {
      brandObject.descriptions.forEach((el) => {
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
      brandObject.descriptions.forEach(el => {
        for (const elKey in el) {
          if (el.hasOwnProperty(elKey)) {
            if (typeof el[elKey] === 'undefined') {
              el[elKey] = '';
            }
          }
        }
      });
      console.log('saving', brandObject);

      // this.brandService.checkCategoryCode(brandObject.code)
      //   .subscribe(res => {
      //     if (this.category.id) {
      //       // if exist, it is updating
      //       if (!res.exists || (res.exists && this.category.code === this.form.value.code)) {
      //         this.brandService.updateCategory(this.category.id, brandObject)
      //           .subscribe(result => {
      //             console.log(result);
      //             this.toastr.success(this.translate.instant('category.toastr.categoryUpdated'));
      //             this.router.navigate(['pages/catalogue/categories/categories-list']);
      //           });
      //       } else {
      //         this.isCodeUnique = false;
      //       }
      //     } else {
      //       // if doesn't exist, it is creating
      //       if (!res.exists) {
      //         this.brandService.addCategory(brandObject)
      //           .subscribe(result => {
      //             console.log(result);
      //             this.toastr.success(this.translate.instant('category.toastr.categoryCreated'));
      //             this.router.navigate(['pages/catalogue/categories/categories-list']);
      //           });
      //       } else {
      //         this.isCodeUnique = false;
      //       }
      //     }
      //   });
    }
  }

}
