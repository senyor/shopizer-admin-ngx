import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { OrdersGuard } from './shared/guards/orders.guard';
import { UserProfileComponent } from './user-management/user-profile/user-profile.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'orders',
      canActivate: [OrdersGuard],
      loadChildren: 'app/pages/orders/orders.module#OrdersModule'
    },
    {
      path: 'user-management',
      loadChildren: 'app/pages/user-management/user-management.module#UserManagementModule'
    },
    // {
    //   path: 'user-management/profile',
    //   component: UserProfileComponent
    // },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: '**',
      component: NotFoundComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
