import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[ngxValidateNumber]'
})
export class ValidateNumberDirective {
  constructor() {
  }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    const keyCode = event.keyCode;

    const excludedKeys = [8, 37, 39, 46];

    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))) {
      event.preventDefault();
    }
  }
}
