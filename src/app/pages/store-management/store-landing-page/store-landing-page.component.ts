import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfigService } from '../../shared/services/config.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'ngx-store-landing-page',
  templateUrl: './store-landing-page.component.html',
  styleUrls: ['./store-landing-page.component.scss']
})
export class StoreLandingPageComponent implements OnInit {
  form: FormGroup;
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
  loadingButton = false;
  loading = false;
  page: any;

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private storeService: StoreService,
    // private toastrService: ToastrService,
    // private translate: TranslateService,
    // private storageService: StorageService
  ) {
    this.createForm();
    this.configService.getListOfSupportedLanguages()
      .subscribe(languages => {
        this.languages = [...languages];
        this.createForm();
      });
    this.storeService.getPageContent('LANDING_PAGE')
      .subscribe(res => {
        this.page = res;
        // this.fillForm();
      });
  }

  ngOnInit() {
  }

  private createForm() {
    this.form = this.fb.group({
      descriptions: this.fb.array([]),
      selectedLanguage: [(this.languages[0] && this.languages[0].code) || '', [Validators.required]],
    });
    this.addFormArray();
  }

  addFormArray() {
    const control = <FormArray>this.form.controls.descriptions;
    this.languages.forEach(lang => {
      control.push(
        this.fb.group({
          language: [lang.code, [Validators.required]],
          name: ['', [Validators.required]],
          contentType: ['PAGE'],
          path: [''],
          slug: [''],
          code: ['LANDING_PAGE'],
          metaDetails: [''],
          title: ['', [Validators.required]],
          pageContent: ['', [Validators.required]],
          // displayedInMenu: [false]
        })
      );
    });
  }

  fillForm() {
    this.form.patchValue({
      descriptions: [],
      selectedLanguage: 'en',
    });
    this.fillFormArray();
  }

  fillFormArray() {
    this.form.value.descriptions.forEach((desc, index) => {
      this.page.descriptions.forEach((description) => {
        if (desc.language === description.language) {
          (<FormArray>this.form.get('descriptions')).at(index).patchValue({
            language: description.language,
            name: description.name,
            contentType: description.contentType,
            path: description.path,
            slug: description.slug,
            code: description.code,
            metaDetails: description.metaDetails,
            title: description.title,
            pageContent: description.pageContent,
            displayedInMenu: description.displayedInMenu
          });
        }
      });
    });
  }

  get selectedLanguage() {
    return this.form.get('selectedLanguage');
  }

  get descriptions(): FormArray {
    return <FormArray>this.form.get('descriptions');
  }

  save() {
    console.log(this.form.value);
    // this.loadingButton = true;
    // this.form.patchValue({ name: this.storageService.getMerchant() });
    // this.storeService.updatePageContent(this.form.value)
    //   .subscribe(res => {
    //     console.log(res);
    //     this.loadingButton = false;
    //     this.toastrService.success(this.translate.instant('STORE_LANDING.PAGE_ADDED'));
    //   }, error1 => {
    //     this.loadingButton = false;
    //   });
  }

}
