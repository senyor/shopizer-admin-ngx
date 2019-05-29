import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { TablesRoutingModule } from './tables/tables-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TablesComponent } from './tables/tables.component';
import { SmartTableComponent } from './tables/smart-table/smart-table.component';

@NgModule({
  imports: [
    PagesRoutingModule,

    ThemeModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    PagesComponent,
    HomeComponent,
    OrdersComponent,

    TablesComponent,
    SmartTableComponent,
  ]
})
export class PagesModule {
}
