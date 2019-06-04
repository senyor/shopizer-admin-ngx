/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(
    private translate: TranslateService
  ) {
    translate.addLangs([...environment.client.language.array]);
    translate.setDefaultLang(environment.client.language.default);
    translate.use(environment.client.language.default);
  }

  ngOnInit(): void {
  }
}
