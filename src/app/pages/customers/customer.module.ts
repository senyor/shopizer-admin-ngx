import { NgModule } from '@angular/core';
import { CustomersRoutingModule, routedComponents } from './customer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NbDialogModule } from '@nebular/theme';
@NgModule({
  declarations: [
    ...routedComponents

  ],
  imports: [
    CustomersRoutingModule,
    SharedModule,
    NbDialogModule.forChild()
  ],
  exports: []
})
export class CustomersModule { }
