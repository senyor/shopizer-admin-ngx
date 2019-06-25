import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { ConfigService } from '../../../shared/services/config.service';

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

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private configService: ConfigService
  ) {
  }

  ngOnInit() {
    this.categoryService.getListOfCategories()
      .subscribe(res => {
        res.sort((a, b) => {
          if ( a.code < b.code )
            return -1;
          if ( a.code > b.code )
            return 1;
          return 0;
        });
        console.log(res);
        this.roots = [...res];
      });
    this.configService.getListOfSupportedLanguages()
      .subscribe(res => {
        console.log(res);
        this.languages = [...res];
      });
    this.createForm();

  }

  private createForm() {
    this.form = this.fb.group({
      root: ['', [Validators.required]], // ??
      visible: [false, [Validators.required]],
      code: ['', [Validators.required]],
      order: [0, [Validators.required]],
      language: ['', [Validators.required]],
      name: ['', [Validators.required]],
      shortName: ['', [Validators.required]],
      friendlyName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      title: ['', [Validators.required]],
      keywords: ['', [Validators.required]],
      pageDescription: ['', [Validators.required]],
    });
  }

}
