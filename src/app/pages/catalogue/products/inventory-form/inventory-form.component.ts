import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManufactureService } from '../../../shared/services/manufacture.service';
import { ConfigService } from '../../../shared/services/config.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../services/product.service';
import { ProductImageService } from '../services/product-image.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
    private manufactureService: ManufactureService,
    private configService: ConfigService,
    private toastr: ToastrService,
    private productService: ProductService,
    private productImageService: ProductImageService,
    private router: Router,
    private translate: TranslateService,
    private storeService: StoreService
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.loader = true;
    this.storeService.getListOfStores({})
      .subscribe(res => {
        this.stores = [...res.data];
        this.loader = false;
      });
  }

  private createForm() {
    this.form = this.fb.group({
      store: ['', [Validators.required]],
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
    console.log('save');
  }

}
