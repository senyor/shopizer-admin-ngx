import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfigService } from '../../../shared/services/config.service';
import { Option } from '../models/option';
import { OptionService } from '../services/option.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
  form: FormGroup;
  loader = false;
  option = new Option();
  languages = [];
  types = [
    'Select', 'Radio', 'Checkbox', 'Text'
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private configService: ConfigService,
    private optionService: OptionService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    this.languages = [...this.configService.languages];
  }

  ngOnInit() {
    const optionId = this.activatedRoute.snapshot.paramMap.get('optionId');
    this.createForm();
    if (optionId) {
      // TODO remove mock object
      this.option = {
        'id': 301,
        'code': 'test11',
        'type': 'radio',
        'readOnly': false,
        'order': 0,
        'descriptions': [
          {
            'language': 'en',
            'name': 'test11en',
            'description': null,
            'friendlyUrl': null,
            'keyWords': null,
            'highlights': null,
            'metaDescription': null,
            'title': null
          },
          {
            'language': 'fr',
            'name': 'test11fr',
            'description': null,
            'friendlyUrl': null,
            'keyWords': null,
            'highlights': null,
            'metaDescription': null,
            'title': null
          }]
      };
      this.fillForm();
    }
  }

  get selectedLanguage() {
    return this.form.get('selectedLanguage');
  }

  get descriptions(): FormArray {
    return <FormArray>this.form.get('descriptions');
  }

  private createForm() {
    this.form = this.fb.group({
      code: ['', [Validators.required]],
      type: ['', [Validators.required]],
      order: ['', [Validators.required]],
      selectedLanguage: ['', [Validators.required]],
      descriptions: this.fb.array([])
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
          selectedLanguage: 'en'
        })
      );
    });
  }

  fillForm() {
    this.form.patchValue({
      code: this.option.code,
      type: this.option.type,
      order: this.option.order,
      selectedLanguage: 'en',
    });
    this.fillFormArray();
  }

  fillFormArray() {
    this.form.value.descriptions.forEach((desc, index) => {
      this.option.descriptions.forEach((description) => {
        if (desc.language === description.language) {
          (<FormArray>this.form.get('descriptions')).at(index).patchValue({
            language: description.language,
            name: description.name,
          });
        }
      });
    });
  }

  save() {
    console.log('save', this.form.value);
    if (this.option.id) {
      const optionObj = { ...this.form.value, id: this.option.id };
      this.optionService.updateOption(this.option.id, optionObj).subscribe(res => {
        // console.log(res);
        this.toastr.success(this.translate.instant('OPTION.OPTION_UPDATED'));
      });
    } else {
      this.optionService.createOption(this.form.value).subscribe(res => {
        this.toastr.success(this.translate.instant('OPTION.OPTION_CREATED'));
      });
    }
  }

}
