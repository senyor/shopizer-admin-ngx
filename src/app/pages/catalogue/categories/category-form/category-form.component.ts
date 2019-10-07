import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CategoryService } from '../services/category.service';
import { ConfigService } from '../../../shared/services/config.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  @Input() category: any;
  form: FormGroup;
  roots = [];
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
  showRemoveButton = true;
  loader = false;
  isCodeUnique = true;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.categoryService.getListOfCategories()
      .subscribe(res => {
        res.push({id: 0, code: 'root'});
        res.sort((a, b) => {
          if (a.code < b.code)
            return -1;
          if (a.code > b.code)
            return 1;
          return 0;
        });
        this.roots = [...res];
      });
    this.loader = true;
    this.configService.getListOfSupportedLanguages()
      .subscribe(res => {
        this.languages = [...res];
        this.createForm();
        this.addFormArray();
        if (this.category.id) {
          this.fillForm();
        }
        this.loader = false;
      });
  }

  private createForm() {
    this.form = this.fb.group({
      parent: ['root', [Validators.required]],
      visible: [false],
      code: ['', [Validators.required]],
      sortOrder: [0, [Validators.required]],
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
      parent: this.category.parent === null ? 'root' : this.category.parent.code,
      visible: this.category.visible,
      code: this.category.code,
      sortOrder: this.category.sortOrder,
      selectedLanguage: 'en',
      descriptions: [],
    });
    this.fillFormArray();
  }

  fillFormArray() {
    this.form.value.descriptions.forEach((desc, index) => {
      this.category.descriptions.forEach((description) => {
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
    this.categoryService.checkCategoryCode(code)
      .subscribe(res => {
        this.isCodeUnique = !(res.exists && (this.category.code !== code));
      });
  }

  save() {
    const categoryObject = this.form.value;
    const categoryObj = this.roots.find((el) => el.code === categoryObject.parent);
    categoryObject.parent = { id: categoryObj.id, code: categoryObj.code };

    // save important values for filling empty field in result object
    const tmpObj = {
      name: '',
      friendlyUrl: ''
    };
    categoryObject.descriptions.forEach((el) => {
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
    if (tmpObj.name === '' || tmpObj.friendlyUrl === '' || categoryObject.code === '') {
      this.toastr.error(this.translate.instant('common.fillRequiredFields'));
    } else {
      categoryObject.descriptions.forEach((el) => {
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
      categoryObject.descriptions.forEach(el => {
        for (const elKey in el) {
          if (el.hasOwnProperty(elKey)) {
            if (typeof el[elKey] === 'undefined') {
              el[elKey] = '';
            }
          }
        }
      });
      console.log('saving', categoryObject);

      this.categoryService.checkCategoryCode(categoryObject.code)
        .subscribe(res => {
          if (this.category.id) {
            // if exist, it is updating
            if (!res.exists || (res.exists && this.category.code === this.form.value.code)) {
              this.categoryService.updateCategory(this.category.id, categoryObject)
                .subscribe(result => {
                  console.log(result);
                  this.toastr.success(this.translate.instant('category.toastr.categoryUpdated'));
                  this.router.navigate(['pages/catalogue/categories/categories-list']);
                });
            } else {
              this.isCodeUnique = false;
            }
          } else {
            // if doesn't exist, it is creating
            if (!res.exists) {
              this.categoryService.addCategory(categoryObject)
                .subscribe(result => {
                  console.log(result);
                  this.toastr.success(this.translate.instant('category.toastr.categoryCreated'));
                  this.router.navigate(['pages/catalogue/categories/categories-list']);
                });
            } else {
              this.isCodeUnique = false;
            }
          }
        });
    }
  }

  remove() {
    this.categoryService.deleteCategory(this.category.id)
      .subscribe(res => {
        this.toastr.success(this.translate.instant('category.toastr.categoryRemoved'));
        this.router.navigate(['pages/store-management/stores-list']);
      });
  }

}
