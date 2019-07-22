import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProductsComponent } from './products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductCreationComponent } from './product-creation/product-creation.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AvailableButtonComponent } from './products-list/available-button.component';
import { NgxSummernoteModule } from 'ngx-summernote';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductCreationComponent,
    ProductFormComponent,
    ProductDetailsComponent,
    AvailableButtonComponent
  ],
  imports: [
    ProductsRoutingModule,

    SharedModule,
    NgxSummernoteModule,
  ],
  entryComponents: [ AvailableButtonComponent ]
})
export class ProductsModule {
}
