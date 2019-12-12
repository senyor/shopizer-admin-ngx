import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatalogueComponent } from './catalogue.component';
import { SuperAdminCatalogueGuard } from '../shared/guards/super-admin-catalogue.guard';

const routes: Routes = [{
  path: '',
  component: CatalogueComponent,
  children: [
    {
      path: 'categories',
      canActivate: [SuperAdminCatalogueGuard],
      loadChildren: 'app/pages/catalogue/categories/categories.module#CategoriesModule'
    },
    {
      path: 'products',
      loadChildren: 'app/pages/catalogue/products/products.module#ProductsModule'
    },
    {
      path: 'brands',
      canActivate: [SuperAdminCatalogueGuard],
      loadChildren: 'app/pages/catalogue/brands/brands.module#BrandsModule'
    },
    {
      path: 'catalogues',
      loadChildren: 'app/pages/catalogue/catalogues/catalogues.module#CataloguesModule'
    },
    {
      path: 'products-groups',
      loadChildren: 'app/pages/catalogue/products-groups/products-groups.module#ProductsGroupsModule'
    },
    {
      path: 'options',
      loadChildren: 'app/pages/catalogue/options/options.module#OptionsModule'
    },
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule {
}
