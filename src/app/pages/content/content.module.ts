import { NgModule } from '@angular/core';
import { ContentRoutingModule, routedComponents } from './content-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ngfModule } from 'angular-file';
import { QueryBuilderModule } from "angular2-query-builder";
// import { ContentComponent } from './content.component';
// import { PageComponent } from './pages/page.component';
@NgModule({
  declarations: [
    ...routedComponents
  ],
  imports: [
    ContentRoutingModule,
    SharedModule,
    ngfModule,
    QueryBuilderModule
  ],
  exports: [ngfModule]
})
export class ContentModule { }
