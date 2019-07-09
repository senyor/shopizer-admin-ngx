import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatalogueComponent } from './catalogue.component';

const routes: Routes = [{
  path: '',
  component: CatalogueComponent,
  children: [
    {
      path: 'categories',
      loadChildren: 'app/pages/catalogue/categories/categories.module#CategoriesModule'
    },
    {
      path: 'products',
      loadChildren: 'app/pages/catalogue/products/products.module#ProductsModule'
    },
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule {
}
