import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreManagementComponent } from './store-management.component';
import { StoreCreationComponent } from './store-creation/store-creation.component';
import { StoresListComponent } from './stores-list/stores-list.component';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { SuperadminGuard } from '../shared/guards/superadmin.guard';
import { StoreGuard } from '../shared/guards/store.guard';
import { StoreLandingPageComponent } from './store-landing-page/store-landing-page.component';
import { StoreDetailInfoComponent } from './store-detail-info/store-detail-info.component';
import { StoreBrandingComponent } from './store-branding/store-branding.component';
import { RetailerComponent } from './retailer/retailer.component';
import { RetailerPageGuard } from '../shared/guards/retailer-page.guard';
import { RetailerListComponent } from './retailer-list/retailer-list.component';
import { RetailerCreationComponent } from './retailer-creation/retailer-creation.component';
import { SuperuserAdminGuard } from '../shared/guards/superuser-admin.guard';

const routes: Routes = [
  {
    path: '', component: StoreManagementComponent, children: [
      {
        path: '',
        redirectTo: 'store-details',
        pathMatch: 'full',
      },
      {
        path: 'store-details',
        component: StoreDetailsComponent,
        canActivate: [StoreGuard]
      },
      {
        path: 'create-store',
        component: StoreCreationComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'stores-list',
        component: StoresListComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'store-landing',
        component: StoreLandingPageComponent,
        canActivate: [StoreGuard]
      },
      {
        path: 'store-information/:code',
        component: StoreDetailInfoComponent,
        canActivate: [StoreGuard]
      },
      {
        path: 'store-branding',
        component: StoreBrandingComponent,
        canActivate: [StoreGuard]
      },
      {
        path: 'retailer',
        component: RetailerComponent,
        canActivate: [RetailerPageGuard]
      },
      {
        path: 'retailer-list',
        component: RetailerListComponent,
        canActivate: [SuperuserAdminGuard]
      },
      {
        path: 'create-retailer',
        component: RetailerCreationComponent,
        canActivate: [SuperuserAdminGuard]
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreManagementRoutingModule {
}
