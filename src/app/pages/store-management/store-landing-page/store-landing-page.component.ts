import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      // [groupName, [list of button]]
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

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private storeService: StoreService,
  ) {
    this.createForm();
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
      language: [''],
      name: '',
      contentType: '',
      path: '',
      slug: '',
      code: '',
      metaDetails: [''],
      title: ['', [Validators.required]],
      pageContent: ['', [Validators.required]],
      displayedInMenu: false
    });
  }

  onBlur() {
    console.log(this.form.value.pageContent);
  }

  save() {
    this.loading = true;
    console.log('save', this.form.value);
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

}
