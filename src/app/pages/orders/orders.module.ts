import { NgModule } from '@angular/core';

import { OrdersComponent } from './orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OrderListComponent } from './order-list/order-list.component';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderListComponent
  ],
  imports: [
    OrdersRoutingModule,

    SharedModule
  ]
})
export class OrdersModule { }
