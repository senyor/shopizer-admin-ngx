import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CatalogueComponent } from './catalogue.component';

@NgModule({
  declarations: [
    CatalogueComponent
  ],
  imports: [
    CatalogueRoutingModule,

    SharedModule
  ]
})
export class CatalogueModule { }
