import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() product;
  form: FormGroup;
  loader = false;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      // uniqueCode: ['', [Validators.required]], // ???
      sku: ['', [Validators.required]],
      available: [false, [Validators.required]],
      preOrder: [false, [Validators.required]],
      dateAvailable: ['', [Validators.required]],
      // manufacturer: ['', [Validators.required]],  // ???
      // productType: [0, [Validators.required]], // ???
      price: [0, [Validators.required]],
      quantity: [0, [Validators.required]],
      sortOrder: [0, [Validators.required]],
      productShipeable: [false, [Validators.required]],
      // dimensions: [0, [Validators.required]],  // ???
      // placementOrder: [0, [Validators.required]],  // ???
      // image: [0, [Validators.required]],  // ???
      // taxClass: [0, [Validators.required]], // ???
    });
  }

  save() {
    console.log(this.form.value);
  }

}
