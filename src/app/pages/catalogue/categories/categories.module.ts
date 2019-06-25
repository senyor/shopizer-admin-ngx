import { NgModule } from '@angular/core';

import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CategoryCreationComponent } from './category-creation/category-creation.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoriesHierarchyComponent } from './categories-hierarchy/categories-hierarchy.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryCreationComponent,
    CategoriesListComponent,
    CategoriesHierarchyComponent
  ],
  imports: [
    CategoriesRoutingModule,

    SharedModule
  ]
})
export class CategoriesModule {
}
