import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './customer.component';
import { ListComponent } from './customer/list.component';
import { AddComponent } from './customer/add.component';
import { OptionListComponent } from './options/list.component';
const routes: Routes = [{
  path: '',
  component: CustomersComponent,
  children: [
    {
      path: 'list',
      component: ListComponent,
    },
    {
      path: 'add',
      component: AddComponent,
    },
    {
      path: 'option/list',
      component: OptionListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule { }

export const routedComponents = [
  CustomersComponent,
  ListComponent,
  AddComponent,
  OptionListComponent
];
