import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OrderListComponent } from '../orders/order-list/order-list.component';
import { NbSpinnerModule } from '@nebular/theme';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    OrderListComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,

    Ng2SmartTableModule,
    ThemeModule,
    NbSpinnerModule
  ],
  exports: [
    Ng2SmartTableModule,
    ThemeModule,
    NbSpinnerModule,

    OrderListComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
