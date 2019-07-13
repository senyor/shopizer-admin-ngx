import { Component, OnInit, OnDestroy } from '@angular/core';
import { FileElement } from './model/element';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { NewFolderDialogComponent } from './modals/newFolderDialog/newFolderDialog.component';
import { RenameDialogComponent } from './modals/renameDialog/renameDialog.component';
import * as uniqueID from 'lodash.uniqueid';
import * as filesize from 'filesize';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from '../service/file.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent implements OnInit {
  uploadedFiles: any[] = [];
  fileElements: Observable<FileElement[]>;
  currentRoot: FileElement;
  currentPath: string;
  canNavigateUp = false;
  fileElement: FileElement;
  path: string;
  init: boolean;
  constructor(public dialog: MatDialog, public fileService: FileService, private sanitization: DomSanitizer) {

  }

  ngOnInit() {
    this.updateFileElementQuery();

  }
  updateFileElementQuery() {
    this.fileElements = this.fileService.queryInFolder(this.currentRoot ? this.currentRoot.id : 'root');

  }
  addFolder(folder: { name: string }) {
    this.fileService.add({ isFolder: true, name: folder.name, parent: this.currentRoot ?
      this.currentRoot.id : 'root', file : null, preview: null, url: null, type: null });
    this.updateFileElementQuery();
  }
  addFile(element: FileElement) {
    this.fileService.add({ isFolder: false, name: element.name, parent: this.currentRoot ?
      this.currentRoot.id : 'root', file : element.file, preview: element.preview,
      url: element.url, type: element.type });
    this.updateFileElementQuery();
  }
  deleteElement(element: FileElement) {
    this.fileService.delete(element.id);
    this.updateFileElementQuery();
  }
  navigate(element: FileElement) {
    if (element.isFolder) {
      this.currentRoot = element;
      this.updateFileElementQuery();
      this.currentPath = this.pushToPath(this.currentPath, element.name);
      this.canNavigateUp = true;
    }
  }
  navigateUp() {
    if (this.currentRoot && this.currentRoot.parent === 'root') {
      this.currentRoot = null;
      this.canNavigateUp = false;
      this.updateFileElementQuery();
    } else {
      this.currentRoot = this.fileService.get(this.currentRoot.parent);
      this.updateFileElementQuery();
    }
    this.currentPath = this.popFromPath(this.currentPath);
  }

  moveElement(event: { element: FileElement; moveTo: FileElement }) {
    this.fileService.update(event.element.id, { parent: event.moveTo.id });
    this.updateFileElementQuery();
  }
  renameElement(element: FileElement) {
    this.fileService.update(element.id, { name: element.name });
    this.updateFileElementQuery();
  }
  pushToPath(path: string, folderName: string) {
    let p = path ? path : '';
    p += `${folderName}/`;
    return p;
  }
  popFromPath(path: string) {
    let p = path ? path : '';
    const split = p.split('/');
    split.splice(split.length - 2, 1);
    p = split.join('/');
    return p;
  }

  openNewFolderDialog() {
    const dialogRef = this.dialog.open(NewFolderDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.addFolder({ name: res });
      }
    });
  }

  openRenameDialog(element: FileElement) {
    const dialogRef = this.dialog.open(RenameDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        element.name = res;
        this.renameElement(element);
      }
    });
  }

  openMenu(event: MouseEvent, viewChild: MatMenuTrigger) {
    event.preventDefault();
    viewChild.openMenu();
  }



  handleUpload = (files: File[]) => {
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueID(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: this.sanitization.bypassSecurityTrustStyle(`url(${URL.createObjectURL(file)})`),
      progress: 0,
      uploaded: false,
      error: false,
      type: file.type,
      url: `url(${URL.createObjectURL(file)})`
    }));

    this.uploadedFiles.push(...uploadedFiles);

    uploadedFiles.forEach(this.processUpload);

  }

  processUpload = (uploadedFile) => {
    this.fileElement = new FileElement();
    this.fileElement.id = uploadedFile.id;
    this.fileElement.isFolder = false;
    this.fileElement.name = uploadedFile.name;
    this.fileElement.file = uploadedFile.file;
    this.fileElement.preview = uploadedFile.preview;
    this.fileElement.url = uploadedFile.url;
    this.fileElement.type = uploadedFile.type;
    this.addFile(this.fileElement);

  }

}
