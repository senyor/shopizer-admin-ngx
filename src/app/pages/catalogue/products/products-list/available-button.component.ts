import { Component, Input, OnInit } from '@angular/core';

import { ProductService } from '../services/product.service';

@Component({
  template: `<input type="checkbox" [checked]="value"  (click)="clicked() "/>`,
})
export class AvailableButtonComponent implements OnInit {
  @Input() value: boolean;

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit() {
  }

  clicked() {
    this.value = !this.value;
    const product = {
      available: this.value,
    };
    console.log(product);
    // this.productService.updateProductFromTable(event.newData.id, product)
    //   .subscribe(res => {
    //     console.log(res);
    //     event.confirm.resolve(event.newData);
    //   });
  }

}
