import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from '../tables/tables-routing.module';
import { SmartTableComponent } from '../tables/smart-table/smart-table.component';
import { ECommerceModule } from '../e-commerce/e-commerce.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TablesComponent } from '../tables/tables.component';
import { MiscellaneousModule } from '../miscellaneous/miscellaneous.module';
import { OrderListComponent } from '../orders/order-list/order-list.component';


@NgModule({
  declarations: [
    TablesComponent,
    SmartTableComponent,
    OrderListComponent
  ],
  imports: [
    CommonModule,

    TablesRoutingModule,
    Ng2SmartTableModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
  ],
  exports: [
    TablesRoutingModule,
    Ng2SmartTableModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    OrderListComponent
  ]
})
export class SharedModule { }
