import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-option-values',
  templateUrl: './option-values.component.html',
  styleUrls: ['./option-values.component.scss']
})
export class OptionValuesComponent implements OnInit {
  form: FormGroup;
  loader = false;
  types = [
    'radio',
    'checkbox',
    'text'
  ];
  option = { 'display': false, 'code': 'Color', 'name': 'Color', 'id': 1, 'type': 'radio', lastModif: '123'};

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    const optionId = this.activatedRoute.snapshot.paramMap.get('optionValueId');
    console.log(optionId);
    this.createForm();
    if (optionId) {
      this.fillForm();
    }
  }

  private createForm() {
    this.form = this.fb.group({
      code: ['', [Validators.required]], // check for uniqueness
      name: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });
  }

  fillForm() {
    this.form.patchValue({
      code: this.option.code,
      name: this.option.name,
      type: this.option.type,
    });
  }


  save() {
    console.log('save');
  }

}
