import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbCheckboxModule, NbInputModule, NbButtonModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { ContentRoutingModule, routedComponents } from './content-routing.module';
import { CKEditorModule } from 'ng2-ckeditor';
// import { FsIconComponent } from './pages/pages.component';
@NgModule({
  imports: [
    NbCardModule,
    NbCheckboxModule,
    NbInputModule,
    NbButtonModule,

    // NbTreeGridModule,
    // NbIconModule,
    // NbInputModule,
    CKEditorModule,
    ThemeModule,
    FormsModule,
    ContentRoutingModule,
    Ng2SmartTableModule
  ],
  declarations: [
    ...routedComponents,
    // FsIconComponent
  ],
})
export class ContentModule { }
