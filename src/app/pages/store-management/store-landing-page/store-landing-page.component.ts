import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfigService } from '../../shared/services/config.service';
import { StoreService } from '../services/store.service';
import { UserService } from '../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

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
  store: any = {};
  page: any;

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private storeService: StoreService,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    this.createForm();
    this.loading = true;
    this.storeService.getPageContent('DEFAULT', 'LANDING_PAGE')
      .subscribe(res => {
        this.page = res;
        this.fillForm();
      });
    this.userService.getMerchant()
      .subscribe(res => {
        this.store = res;
      });
  }

  ngOnInit() {
    this.configService.getListOfSupportedLanguages()
      .subscribe(languages => {
        this.languages = [...languages];
      });
  }

  get title() {
    return this.form.get('title');
  }

  private createForm() {
    this.form = this.fb.group({
      language: ['', [Validators.required]],
      name: [''],
      contentType: ['PAGE'],
      path: [''],
      slug: [''],
      code: ['LANDING_PAGE'],
      metaDetails: [''],
      title: ['', [Validators.required]],
      pageContent: ['', [Validators.required]],
      displayedInMenu: [false]
    });
  }

  fillForm() {
    this.form.patchValue({
      language: 'en',
      name: this.page.name,
      contentType: this.page.contentType,
      path: this.page.path,
      slug: this.page.slug,
      code: this.page.code,
      metaDetails: this.page.metaDetails,
      title: this.page.title,
      pageContent: this.page.pageContent,
      displayedInMenu: this.page.displayedInMenu
    });
    this.loading = false;
  }

  save() {
    this.loadingButton = true;
    this.form.patchValue({ name: this.store.name });
    this.storeService.updatePageContent(this.store.code, this.form.value)
      .subscribe(res => {
        console.log(res);
        this.loadingButton = false;
        this.toastrService.success('Page has been added.', 'Success');
      }, error1 => {
        this.loadingButton = false;
      });
  }

}
