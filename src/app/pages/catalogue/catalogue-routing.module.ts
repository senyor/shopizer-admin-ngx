import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatalogueComponent } from './catalogue.component';

const routes: Routes = [{
  path: '',
  component: CatalogueComponent,
  children: [
    {
      path: 'categories',
      // component: CategoriesComponent,
      // canActivate: [OrdersGuard],
      loadChildren: 'app/pages/catalogue/categories/categories.module#CategoriesModule'
    },
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule {
}
