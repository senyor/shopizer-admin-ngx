import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// import { LocalDataSource } from 'ng2-smart-table';
// import { SmartTableData } from '../../../@core/data/smart-table';
// import { AppService } from '../../../directive/app.service';
// import { Action } from '../../../directive/app.constants';
import { CrudService } from '../../shared/services/crud.service';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../shared/components/showcase-dialog/showcase-dialog.component';
import { Lightbox } from 'ngx-lightbox';
@Component({
  selector: 'images-table',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent {
  uploadedFiles: any[] = [];
  _albums: any[] = [];
  loadingList = false;
  constructor(
    private crudService: CrudService,
    public router: Router,
    private sanitization: DomSanitizer,
    private dialogService: NbDialogService,
    private _lightbox: Lightbox
  ) {
    this.getImages()
  }
  getImages() {
    // let action = Action.CONTENT + Action.BOXES;
    this.loadingList = true;
    this.crudService.get('/v1/content/images')
      .subscribe(data => {
        this.loadingList = false;
        this.uploadedFiles = data.content;
        for (let i = 0; i < this.uploadedFiles.length; i++) {
          const src = this.uploadedFiles[i].path + this.uploadedFiles[i].name;
          const caption = this.uploadedFiles[i].name;
          // const thumb = this.uploadedFiles[i].path + this.uploadedFiles[i].name;
          const album = {
            src: src,
            caption: caption,
            // thumb: thumb
          };
          this._albums.push(album);
        }
      }, error => {
        this.loadingList = false;

      });
  }
  handleUpload = (files: any) => {
    this.loadingList = true;
    files.forEach(element => {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedFiles.push({
          name: element.name,
          contentType: 1,
          path: e.target.result
        });
      }
      reader.readAsDataURL(element);
    });
    for (var i = 0; i < files.length; i++) {
      let formData = new FormData();
      formData.append('file', files[i]);
      this.crudService.post('/v1/private/file', formData)
        .subscribe(data => {
          this.loadingList = false;
          // this.uploadedFiles = data.content;
        }, error => {
          this.loadingList = false;

        });
    }

  }
  openImage(index: number): void {
    // open lightbox
    console.log(this._albums)
    this._lightbox.open(this._albums, index);
  }
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
  removeImage(name) {
    this.loadingList = true;
    console.log(event);
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: 'Are you sure!',
        body: 'Do you really want to remove this entity?'
      },
    })
      .onClose.subscribe(res => {
        if (res) {
          console.log('fsdfsfdf');
          this.crudService.delete('/v1/private/content/?contentType=IMAGE&name=' + name)
            .subscribe(data => {
              this.loadingList = false;
              // this.toastr.success('Page deleted successfully');
              this.getImages();
            }, error => {
              this.loadingList = false;
            });
        } else {
          this.loadingList = false;
        }
      });
  }
}
