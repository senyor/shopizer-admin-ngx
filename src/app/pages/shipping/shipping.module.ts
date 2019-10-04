import { NgModule } from '@angular/core';
import { ShippingRoutingModule, routedComponents } from './shipping-routing.module';
import { SharedModule } from '../shared/shared.module';
// import { ngfModule } from 'angular-file';
// import { QueryBuilderModule } from "angular2-query-builder";
// import { ContentComponent } from './content.component';
// import { PageComponent } from './pages/page.component';
@NgModule({
  declarations: [
    ...routedComponents
  ],
  imports: [
    ShippingRoutingModule,
    SharedModule,
    // ngfModule,
    // QueryBuilderModule
  ],
  exports: []
})
export class ShippingModule { }
