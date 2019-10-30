import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products.component';
import { PriceFormComponent } from './price/price-form/price-form.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: ':productId/inventory/:inventoryId/create-price',
        component: PriceFormComponent,
      },
      {
        path: ':productId/inventory/:inventoryId/price/:priceId',
        component: PriceFormComponent,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PriceRoutingModule {
}
