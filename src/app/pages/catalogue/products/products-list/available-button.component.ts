import { Component, Input, OnInit } from '@angular/core';

@Component({
  template: `<input type="checkbox" [checked]="value"  (click)="clicked($event) "/>`,
})
export class AvailableButtonComponent implements OnInit {
  @Input() value: string | number;

  constructor() {
  }

  ngOnInit() {
  }

  clicked(name) {
    console.log(name);
  }

}
