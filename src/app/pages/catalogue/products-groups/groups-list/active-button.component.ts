import { Component, Input, OnInit } from '@angular/core';

import { ProductGroupsService } from '../services/product-groups.service';


@Component({
  template: `<input type="checkbox" [checked]="value" (click)="clicked() "/>`,
})
export class ActiveButtonComponent implements OnInit {
  @Input() value: boolean;
  @Input() rowData: any;

  constructor(
    private productGroupsService: ProductGroupsService
  ) {
  }

  ngOnInit() {
  }

  clicked() {
    this.value = !this.value;
    const group = {
      active: this.value,
      code: this.rowData.code,
    };
    this.productGroupsService.updateGroupActiveValue(group)
      .subscribe(res => {
      });
  }

}
