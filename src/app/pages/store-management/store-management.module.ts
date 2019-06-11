import { NgModule } from '@angular/core';

import { StoreManagementComponent } from './store-management.component';
import { SharedModule } from '../shared/shared.module';
import { StoreManagementRoutingModule } from './store-management-routing.module';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { StoreMarketingComponent } from './store-marketing/store-marketing.component';
import { StoreCreationComponent } from './store-creation/store-creation.component';
import { StoresListComponent } from './stores-list/stores-list.component';
import { StoreHomeComponent } from './store-home/store-home.component';

@NgModule({
  declarations: [
    StoreManagementComponent,
    StoreDetailsComponent,
    StoreCreationComponent,
    StoresListComponent,
    StoreMarketingComponent,
    StoreHomeComponent
  ],
  imports: [
    StoreManagementRoutingModule,

    SharedModule
  ]
})
export class StoreManagementModule {
}
