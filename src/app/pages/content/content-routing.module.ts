import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './content.component';
import { PagesComponent } from './pages/pages.component';
import { BoxesComponent } from './boxes/boxes.component';
import { AddPageComponent } from './pages/add-page.component';
import { AddBoxComponent } from './boxes/add-box.component';
import { ImagesComponent } from './images/images.component';

const routes: Routes = [{
  path: '',
  component: ContentComponent,
  children: [
    {
      path: 'pages/list',
      component: PagesComponent,
    },
    {
      path: 'pages/add',
      component: AddPageComponent,
    },
    {
      path: 'boxes/list',
      component: BoxesComponent,
    },
    {
      path: 'boxes/add',
      component: AddBoxComponent,
    },
    {
      path: 'images/list',
      component: ImagesComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule { }

export const routedComponents = [
  ContentComponent,
  PagesComponent,
  AddPageComponent,
  BoxesComponent,
  AddBoxComponent,
  ImagesComponent
];
