import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { NgxSummernoteModule } from 'ngx-summernote';
import { NbDialogModule } from '@nebular/theme';
import { CataloguesComponent } from './catalogues.component';
import { CataloguesRoutingModule } from './catalogues-routing.module';
import { CatalogueCreationComponent } from './catalogue-creation/catalogue-creation.component';
import { CataloguesListComponent } from './catalogues-list/catalogues-list.component';

@NgModule({
  declarations: [
    CataloguesComponent,
    CatalogueCreationComponent,
    CataloguesListComponent
  ],
  imports: [
    CataloguesRoutingModule,

    SharedModule,

    NgxSummernoteModule,
    NbDialogModule.forChild(),
  ]
})
export class CataloguesModule { }
