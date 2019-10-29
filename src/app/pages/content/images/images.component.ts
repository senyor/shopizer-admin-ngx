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
@Component({
  selector: 'images-table',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent {
  uploadedFiles: any[] = [];
  loadingList = false;
  constructor(
    private crudService: CrudService,
    public router: Router,
    private sanitization: DomSanitizer,
    private dialogService: NbDialogService
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
          console.log(data);
          this.loadingList = false;
          // this.uploadedFiles = data.content;
        }, error => {
          this.loadingList = false;

        });
    }


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
