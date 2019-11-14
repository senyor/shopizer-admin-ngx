import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OptionService } from '../../../options/services/option.service';
import { OptionValuesService } from '../../../options/services/option-values.service';
import { ProductAttributesService } from '../../services/product-attributes.service';
import { validators } from '../../../../shared/validation/validators';

@Component({
  selector: 'ngx-attribute-form',
  templateUrl: './attribute-form.component.html',
  styleUrls: ['./attribute-form.component.scss']
})
export class AttributeFormComponent implements OnInit {
  productId;
  attributeId;
  attribute: any = {};

  form: FormGroup;
  loader = false;

  options = [];
  optionValues = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private optionService: OptionService,
    private optionValuesService: OptionValuesService,
    private productAttributesService: ProductAttributesService
  ) {
    this.optionService.getListOfOptions({}).subscribe(res => {
      res.options.forEach((option) => {
        this.options.push({ value: option.code, label: option.code });
      });
    });
    this.optionValuesService.getListOfOptionValues({}).subscribe(res => {
      res.optionValues.forEach((optionValue) => {
        this.optionValues.push({ value: optionValue.code, label: optionValue.code });
      });
    });
  }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.paramMap.get('productId');
    this.attributeId = this.activatedRoute.snapshot.paramMap.get('attributeId');
    console.log(this.productId, this.attributeId);
    const optionId = this.activatedRoute.snapshot.paramMap.get('optionId');
    this.createForm();
    if (optionId) {
      // this.optionService.getOptionById(optionId).subscribe(res => {
      //   this.option = res;
      //   this.fillForm();
      // });
    }
  }

  private createForm() {
    this.form = this.fb.group({
      option: ['', [Validators.required]],
      attributeDisplayOnly: [false, [Validators.required]],
      optionValue: ['', [Validators.required]],
      productAttributePrice: [0, [Validators.required]],
      sortOrder: ['', [Validators.required, Validators.pattern(validators.number)]],
      attributeDefault: [false, [Validators.required]],
      requiredOption: [false, [Validators.required]],
      productAttributeWeight: ['', [Validators.required]]
    });
  }

  save() {
    console.log(this.form.value);
    const optionObj = this.form.value;
    optionObj.option = { code: optionObj.option };
    optionObj.optionValue = { code: optionObj.optionValue };
    console.log(optionObj);
    if (this.attribute.id) {

    } else {
      console.log('save');
      this.productAttributesService.createAttribute(this.productId, this.form.value).subscribe(res => {
        console.log(res);
      });
    }
  }

}
