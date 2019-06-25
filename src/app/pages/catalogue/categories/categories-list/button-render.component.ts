import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <span (click)="clicked(renderValue)">{{renderValue}}</span>
  `,
})
export class ButtonRenderComponent implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;

  constructor() {
  }

  ngOnInit() {
    this.renderValue = this.value.toString();
  }

  clicked(name) {
    console.log(name);
  }

}
