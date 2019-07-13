import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { ContentManagementComponent } from './content-management.component';
import { MatCardModule } from '@angular/material/card';
import { FileService } from './service/file.service';
import { NewFolderDialogComponent } from './file-explorer/modals/newFolderDialog/newFolderDialog.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RenameDialogComponent } from './file-explorer/modals/renameDialog/renameDialog.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ngfModule } from 'angular-file';
import { UploadComponent } from './upload/upload.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { ContentManagementRoutingModule} from './content-management-routing.module';


@NgModule({
  declarations: [ContentManagementComponent, FileExplorerComponent,
     NewFolderDialogComponent, RenameDialogComponent, UploadComponent],
  imports: [SharedModule, MatCardModule, MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ngfModule,
    TooltipModule, ContentManagementRoutingModule ],
  providers: [FileService],
  bootstrap: [ContentManagementComponent, FileExplorerComponent, UploadComponent],
  entryComponents: [FileExplorerComponent, NewFolderDialogComponent, RenameDialogComponent]
})
export class ContentManagementModule {}
