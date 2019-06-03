import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MiscellaneousModule } from '../miscellaneous/miscellaneous.module';
import { OrderListComponent } from '../orders/order-list/order-list.component';
import { NbSpinnerModule } from '@nebular/theme';


@NgModule({
  declarations: [
    OrderListComponent
  ],
  imports: [
    CommonModule,

    Ng2SmartTableModule,
    ThemeModule,
    MiscellaneousModule,
    NbSpinnerModule
  ],
  exports: [
    Ng2SmartTableModule,
    ThemeModule,
    MiscellaneousModule,
    NbSpinnerModule,

    OrderListComponent,
  ]
})
export class SharedModule { }
