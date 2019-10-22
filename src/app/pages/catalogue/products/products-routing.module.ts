import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductCreationComponent } from './product-creation/product-creation.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ManageInventoryComponent } from './manage-inventory/manage-inventory.component';
import { InventoryDetailsComponent } from './inventory-details/inventory-details.component';
import { InventoryCreationComponent } from './inventory-creation/inventory-creation.component';


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
        path: 'manage-inventory/:productId',
        component: ManageInventoryComponent,
      },
      {
        path: 'product/:productId/inventory-details/:inventoryId',
        component: InventoryDetailsComponent,
      },
      {
        path: 'inventory-creation',
        component: InventoryCreationComponent,
      },
    ],
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
}
