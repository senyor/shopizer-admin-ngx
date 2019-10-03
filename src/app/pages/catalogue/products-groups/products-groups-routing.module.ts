import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsGroupsCreationComponent } from './products-groups-creation/products-groups-creation.component';
import { ProductsGroupsListComponent } from './products-groups-list/products-groups-list.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { ProductsGroupsComponent } from './products-groups.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsGroupsComponent,
    children: [
      {
        path: 'create-products-group',
        component: ProductsGroupsCreationComponent,
      },
      {
        path: 'products-groups-list',
        component: ProductsGroupsListComponent,
      },
      {
        path: 'groups-list',
        component: GroupsListComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsGroupsRoutingModule { }
