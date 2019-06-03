import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OrderListComponent } from '../orders/order-list/order-list.component';
import { NbInputModule, NbSpinnerModule } from '@nebular/theme';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrderDetailsComponent } from '../orders/order-details/order-details.component';


@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailsComponent,

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
    OrderDetailsComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
