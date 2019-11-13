import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigService } from '../../../shared/services/config.service';
import { OptionValuesService } from '../services/option-values.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { OptionValue } from '../models/optionValue';
import { validators } from '../../../shared/validation/validators';

@Component({
  selector: 'ngx-option-values',
  templateUrl: './option-values.component.html',
  styleUrls: ['./option-values.component.scss']
})
export class OptionValuesComponent implements OnInit {
  form: FormGroup;
  loader = false;
  optionValue = new OptionValue();
  languages = [];
  types = [
    'Select', 'Radio', 'Checkbox', 'Text'
  ];
  isCodeUnique = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private configService: ConfigService,
    private optionValuesService: OptionValuesService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private router: Router,
  ) {
    this.languages = [...this.configService.languages];
  }

  ngOnInit() {
    const optionValueId = this.activatedRoute.snapshot.paramMap.get('optionValueId');
    this.createForm();
    if (optionValueId) {
      this.optionValuesService.getOptionValueById(optionValueId).subscribe(res => {
        this.optionValue = res;
        this.fillForm();
      });
    }
  }

  get selectedLanguage() {
    return this.form.get('selectedLanguage');
  }

  get descriptions(): FormArray {
    return <FormArray>this.form.get('descriptions');
  }

  get code() {
    return this.form.get('code');
  }

  private createForm() {
    this.form = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(validators.alphanumeric)]],
      selectedLanguage: [''],
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
          name: ['', [Validators.required]]
        })
      );
    });
  }

  fillForm() {
    this.form.patchValue({
      code: this.optionValue.code,
      selectedLanguage: 'en',
    });
    this.fillFormArray();
  }

  fillFormArray() {
    this.form.value.descriptions.forEach((desc, index) => {
      this.optionValue.descriptions.forEach((description) => {
        if (desc.language === description.language) {
          (<FormArray>this.form.get('descriptions')).at(index).patchValue({
            language: description.language,
            name: description.name,
          });
        }
      });
    });
  }

  checkCode(event) {
    const code = event.target.value.trim();
    this.optionValuesService.checkOptionValueCode(code)
      .subscribe(res => {
        this.isCodeUnique = !(res.exists && (this.optionValue.code !== code));
      });
  }

  save() {
    if (!this.isCodeUnique) {
      this.toastr.error(this.translate.instant('COMMON.CODE_EXISTS'));
      return;
    }
    if (this.optionValue.id) {
      const optionObj = { ...this.form.value, id: this.optionValue.id };
      this.optionValuesService.updateOptionValue(this.optionValue.id, optionObj).subscribe(res => {
        this.toastr.success(this.translate.instant('OPTION_VALUE.OPTION_VALUE_UPDATED'));
      });
    } else {
      this.optionValuesService.createOptionValue(this.form.value).subscribe(res => {
        this.toastr.success(this.translate.instant('OPTION_VALUE.OPTION_VALUE_CREATED'));
        this.router.navigate(['pages/catalogue/options/options-values-list']);
      });
    }
  }
}
