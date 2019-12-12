import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfigService } from '../../shared/services/config.service';
import { StoreService } from '../services/store.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../shared/services/storage.service';
import { forkJoin } from 'rxjs';

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
  loading = false;
  page;

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private storeService: StoreService,
    private toastrService: ToastrService,
    private translate: TranslateService,
    private storageService: StorageService
  ) {
  }

  ngOnInit() {
    this.createForm();
    forkJoin(this.configService.getListOfSupportedLanguages(), this.storeService.getPageContent('LANDING_PAGE'))
      .subscribe(([languages, res]) => {
        this.languages = [...languages];
        this.createForm();
        this.page = res;
        this.fillForm();
      });
  }

  private createForm() {
    this.form = this.fb.group({
      selectedLanguage: ['', [Validators.required]],
      descriptions: this.fb.array([]),
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
          metaDescription: [''],
          keyWords: [''],
          description: [''],
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
            metaDescription: description.metaDescription,
            keyWords: description.keyWords,
            description: description.description,
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
    this.form.patchValue({ name: this.storageService.getMerchant() });
    if (this.page.id) {
      this.storeService.updatePageContent(this.page.id, this.form.value)
        .subscribe(res => {
          this.toastrService.success(this.translate.instant('STORE_LANDING.PAGE_UPDATED'));
        });
    } else {
      this.storeService.createPageContent(this.form.value)
        .subscribe(res => {
          this.toastrService.success(this.translate.instant('STORE_LANDING.PAGE_ADDED'));
        });
    }
  }

}
