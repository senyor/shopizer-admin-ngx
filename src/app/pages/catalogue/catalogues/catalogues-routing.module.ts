import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CataloguesComponent } from './catalogues.component';
import { CatalogueCreationComponent } from './catalogue-creation/catalogue-creation.component';
import { CataloguesListComponent } from './catalogues-list/catalogues-list.component';

const routes: Routes = [
  {
    path: '',
    component: CataloguesComponent,
    children: [
      {
        path: 'create-catalogue',
        component: CatalogueCreationComponent,
      },
      {
        path: 'catalogues-list',
        component: CataloguesListComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CataloguesRoutingModule {
}
