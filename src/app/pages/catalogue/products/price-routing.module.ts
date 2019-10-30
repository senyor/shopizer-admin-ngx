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
        path: 'create-price',
        component: PriceFormComponent,
      },
      {
        path: 'price-details:priceId',
        component: PriceFormComponent,
      },
      {
        path: 'price-details',
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
