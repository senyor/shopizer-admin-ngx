import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductCreationComponent } from './product-creation/product-creation.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductToCategoryComponent } from './product-to-category/product-to-category.component';
import { ProductAttributesComponent } from './product-attributes/product-attributes.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: 'create-product',
        component: ProductCreationComponent,
      },
      {
        path: 'products-list',
        component: ProductsListComponent,
      },
      {
        path: 'product/:id',
        component: ProductDetailsComponent,
      },
      {
        path: 'association',
        component: ProductToCategoryComponent,
      },
      {
        path: ':productId/product-attributes',
        component: ProductAttributesComponent,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductsRoutingModule {
}
