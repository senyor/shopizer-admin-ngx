import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { NgxSummernoteModule } from 'ngx-summernote';
import { ProductsGroupsRoutingModule } from './products-groups-routing.module';
import { ProductsGroupsComponent } from './products-groups.component';
import { ProductsGroupsCreationComponent } from './products-groups-creation/products-groups-creation.component';
import { ProductsGroupsListComponent } from './products-groups-list/products-groups-list.component';
import { GroupsListComponent } from './groups-list/groups-list.component';

@NgModule({
  declarations: [
    ProductsGroupsComponent,
    ProductsGroupsListComponent,
    GroupsListComponent,
    ProductsGroupsCreationComponent,
  ],
  imports: [
    ProductsGroupsRoutingModule,

    SharedModule,
    NgxSummernoteModule,
  ]
})
export class ProductsGroupsModule { }
