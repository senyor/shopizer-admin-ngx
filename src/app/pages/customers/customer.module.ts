import { NgModule } from '@angular/core';
import { CustomersRoutingModule, routedComponents } from './customer-routing.module';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    ...routedComponents

  ],
  imports: [
    CustomersRoutingModule,
    SharedModule
  ],
  exports: []
})
export class CustomersModule { }
