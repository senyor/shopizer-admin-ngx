import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentManagementComponent } from './content-management.component';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';


const routes: Routes = [
  {
    path: '', component: ContentManagementComponent, children: [
      {
        path: '',
        redirectTo: 'file-explorer',
        pathMatch: 'full',
      },
      {
        path: 'file-explorer',
        component: FileExplorerComponent,
      }
    ],
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentManagementRoutingModule {
}
