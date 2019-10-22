import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StoreService } from '../../../store-management/services/store.service';

@Component({
  selector: 'ngx-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent implements OnInit {
  @Input() inventory;
  form: FormGroup;
  stores = [];
  loader = false;

  constructor(
    private fb: FormBuilder,
    // private toastr: ToastrService,
    // private router: Router,
    // private translate: TranslateService,
    private storeService: StoreService,
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.loader = true;
    this.storeService.getListOfStores({})
      .subscribe(res => {
        res.data.forEach((store) => {
          this.stores.push({value: store.code, label: store.code});
        });
        this.loader = false;
      });
  }

  private createForm() {
    this.form = this.fb.group({
      store: ['DEFAULT', [Validators.required]],
      owner: ['', [Validators.required]],
      price: [0, [Validators.required]],
      quantity: [0, [Validators.required]]
    });
  }

  fillForm() {
    this.form.patchValue({
      store: this.inventory.store,
      owner: this.inventory.owner,
      price: this.inventory.price,
      quantity: this.inventory.quantity,
    });
  }

  // get store() {
  //   return this.form.get('store');
  // }
  //
  // get owner() {
  //   return this.form.get('owner');
  // }
  //
  // get price() {
  //   return this.form.get('price');
  // }
  //
  // get quantity() {
  //   return this.form.get('quantity');
  // }

  save() {
    console.log('save', this.form.value);
    if (this.inventory.id) {
      console.log('update');
    } else {
      console.log('create');
    }
  }

}
