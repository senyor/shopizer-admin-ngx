import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
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
    const optionId = this.activatedRoute.snapshot.paramMap.get('optionId');
    console.log(optionId);
    this.createForm();
    if (optionId) {
      this.fillForm();
    }
  }

  private createForm() {
    this.form = this.fb.group({
      code: ['', [Validators.required]],
      type: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
  }

  fillForm() {
    this.form.patchValue({
      code: this.option.code,
      type: this.option.type,
      name: this.option.name,
    });
  }


  save() {
    console.log('save');
  }

}
