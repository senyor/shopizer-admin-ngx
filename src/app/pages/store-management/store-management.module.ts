import { NgModule } from '@angular/core';

import { StoreManagementComponent } from './store-management.component';
import { SharedModule } from '../shared/shared.module';
import { StoreManagementRoutingModule } from './store-management-routing.module';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { StoreCreationComponent } from './store-creation/store-creation.component';
import { StoresListComponent } from './stores-list/stores-list.component';
import { StoreFormComponent } from './store-form/store-form.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../../environments/environment';
import { StoreLandingPageComponent } from './store-landing-page/store-landing-page.component';
import { NgxSummernoteModule } from 'ngx-summernote';

@NgModule({
  declarations: [
    StoreManagementComponent,
    StoreDetailsComponent,
    StoreCreationComponent,
    StoresListComponent,
    StoreFormComponent,
    StoreLandingPageComponent
  ],
  imports: [
    StoreManagementRoutingModule,

    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: ['places'],
      language: 'en'
    }),

    SharedModule,

    NgxSummernoteModule
  ]
})
export class StoreManagementModule {
}
