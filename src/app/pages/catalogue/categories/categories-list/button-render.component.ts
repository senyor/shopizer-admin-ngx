import { Component, Input } from '@angular/core';

@Component({
  template: `
    <input type="checkbox" [checked]="value" disabled/>
  `,
})
export class ButtonRenderComponent {
  @Input() value: string | number;

  constructor() {
  }

}
