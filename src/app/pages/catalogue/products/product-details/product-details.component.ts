import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '../../../shared/guards/exit.guard';
import { ProductFormComponent } from '../product-form/product-form.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, CanComponentDeactivate {
  product: any = {};
  loadingInfo = false;
  selectedItem = '0';
  @ViewChild(ProductFormComponent) child;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private translate: TranslateService,
  ) {
  }

  ngOnInit() {
    this.loadingInfo = true;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getProductById(id)
      .subscribe(res => {
        this.product = res;
        this.loadingInfo = false;
      });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return (this.child && !this.child.saved) ? confirm(this.translate.instant('COMMON.UNSAVED_DATA')) : true;
  }

}
