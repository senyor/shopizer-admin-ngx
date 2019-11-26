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
import { InventoryRoutingModule } from './inventory-routing.module';
import { ManageInventoryComponent } from './inventory/manage-inventory/manage-inventory.component';
import { InventoryFormComponent } from './inventory/inventory-form/inventory-form.component';
import { InventoryCreationComponent } from './inventory/inventory-creation/inventory-creation.component';
import { InventoryDetailsComponent } from './inventory/inventory-details/inventory-details.component';
import { PricesListComponent } from './price/prices-list/prices-list.component';
import { PriceRoutingModule } from './price-routing.module';
import { PriceFormComponent } from './price/price-form/price-form.component';
import { ProductToCategoryComponent } from './product-to-category/product-to-category.component';
import { ExitGuard } from '../../shared/guards/exit.guard';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductCreationComponent,
    ProductFormComponent,
    ProductDetailsComponent,
    ProductToCategoryComponent,

    AvailableButtonComponent,

    ManageInventoryComponent,
    InventoryDetailsComponent,
    InventoryCreationComponent,
    InventoryFormComponent,

    PricesListComponent,
    PriceFormComponent
  ],
  imports: [
    ProductsRoutingModule,
    InventoryRoutingModule,
    PriceRoutingModule,

    SharedModule,
    NgxSummernoteModule,
  ],
  providers: [ExitGuard],
  entryComponents: [AvailableButtonComponent]
})

export class ProductsModule {
}
