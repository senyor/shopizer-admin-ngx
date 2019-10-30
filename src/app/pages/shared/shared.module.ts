import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OrderListComponent } from '../orders/order-list/order-list.component';
import { NbInputModule, NbSpinnerModule } from '@nebular/theme';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RightSidemenuComponent } from './components/right-sidemenu/right-sidemenu.component';
import { ImageUploadingComponent } from './components/image-uploading/image-uploading.component';
import { ShowcaseDialogComponent } from './components/showcase-dialog/showcase-dialog.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import {PickListModule} from 'primeng/picklist';
import {DropdownModule} from 'primeng/dropdown';
import { BackButtonComponent } from './components/back-button/back-button.component';


@NgModule({
  declarations: [
    OrderListComponent,
    BreadcrumbComponent,
    RightSidemenuComponent,
    NotFoundComponent,
    ImageUploadingComponent,
    ShowcaseDialogComponent,
    PaginatorComponent,
    BackButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    Ng2SmartTableModule,
    ThemeModule,
    NbSpinnerModule,
    TranslateModule
  ],
  exports: [
    Ng2SmartTableModule,
    ThemeModule,
    NbSpinnerModule,
    TranslateModule,

    OrderListComponent,
    BreadcrumbComponent,
    RightSidemenuComponent,
    NotFoundComponent,
    ImageUploadingComponent,
    ShowcaseDialogComponent,
    PaginatorComponent,
    BackButtonComponent,

    PickListModule,
    DropdownModule
  ],
  entryComponents: [ShowcaseDialogComponent],
})
export class SharedModule {
}
