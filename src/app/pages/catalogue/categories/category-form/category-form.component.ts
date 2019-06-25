import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'ngx-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  @Input() category: any;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    this.categoryService.getListOfCategories()
      .subscribe(res => {
        console.log(res);
      });
    this.createForm();

  }

  private createForm() {
    this.form = this.fb.group({
      root: ['', [Validators.required]], // ??
      visible: [false, [Validators.required]],
      code: ['', [Validators.required]],
      // code: [{ value: '', disabled: false }, [Validators.required]],
      // phone: ['', [Validators.required]],
      // email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      // address: this.fb.group({
      //   searchControl: [''],
      //   stateProvince: [{ value: '', disabled: true }],
      //   country: ['', [Validators.required]],
      //   address: ['', [Validators.required]],
      //   postalCode: ['', [Validators.required]],
      //   city: ['', [Validators.required]]
      // }),
      // supportedLanguages: [[], [Validators.required]],
      // defaultLanguage: ['', [Validators.required]],
      // currency: [''],
      // currencyFormatNational: [true],
      // weight: ['', [Validators.required]],
      // dimension: ['', [Validators.required]],
      // inBusinessSince: [''],
      // useCache: [false],
    });
  }

}
