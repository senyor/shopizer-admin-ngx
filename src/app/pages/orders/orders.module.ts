import { NgModule } from '@angular/core';

import { OrdersComponent } from './orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    OrdersComponent,
  ],
  imports: [
    OrdersRoutingModule,

    SharedModule
  ]
})
export class OrdersModule { }
