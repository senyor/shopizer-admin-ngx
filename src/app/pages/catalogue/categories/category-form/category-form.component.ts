import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
          if (a.code < b.code)
            return -1;
          if (a.code > b.code)
            return 1;
          return 0;
        });
        this.roots = [...res];
      });
    this.createForm();
    this.configService.getListOfSupportedLanguages()
      .subscribe(res => {
        this.languages = [...res];
        this.addFormArray();
      });
  }

  private createForm() {
    this.form = this.fb.group({
      root: ['', [Validators.required]], // ??
      visible: [false, [Validators.required]],
      code: ['', [Validators.required]],
      order: [0, [Validators.required]],
      selectedLanguage: ['', [Validators.required]],
      descriptions: this.fb.array([]),
    });
  }

  addFormArray() {
    const control = <FormArray>this.form.controls.descriptions;
    this.languages.forEach(language1 => {
      control.push(
        this.fb.group({
          language: [language1.code, [Validators.required]],
          name: ['', [Validators.required]],
          highlight: [''],
          friendlyUrl: [''],
          description: [''],
          title: [''],
          keyWords: [''],
          metaDescription: [''],
        })
      );
    });
  }

  get selectedLanguage() {
    return this.form.get('selectedLanguage');
  }

  save() {
    console.log('save', this.form.value);
  }

}
