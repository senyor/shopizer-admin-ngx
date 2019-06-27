import { Component, Input, OnInit } from '@angular/core';

@Component({
  template: `
    <input type="checkbox" [checked]="value" disabled (click)="clicked($event) "/>
  `,
})
export class ButtonRenderComponent implements OnInit {
  @Input() value: string | number;

  constructor() {
  }

  ngOnInit() {
  }

  clicked(name) {
    console.log(name);
  }

}
