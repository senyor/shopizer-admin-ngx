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
    'radio',
    'checkbox',
    'text'
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
    console.log(optionId);
    this.createForm();
    if (optionId) {
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
    });
  }

  save() {
    // console.log('save', this.form.value);
    if (this.option.id) {
      // update
    } else {
      this.optionService.createOption(this.form.value).subscribe(res => {
        // console.log(res);
        this.toastr.success(this.translate.instant('OPTION.OPTION_CREATED'));
      });
    }
  }

}
