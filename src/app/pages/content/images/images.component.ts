import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// import { LocalDataSource } from 'ng2-smart-table';
// import { SmartTableData } from '../../../@core/data/smart-table';
// import { AppService } from '../../../directive/app.service';
// import { Action } from '../../../directive/app.constants';
import { CrudService } from '../../shared/services/crud.service';
import { Router } from '@angular/router';
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
    private sanitization: DomSanitizer
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
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.uploadedFiles.push({
        name: files[0].name,
        contentType: 1,
        path: e.target.result
      });
    }
    reader.readAsDataURL(files[0]);

    let formData = new FormData();
    formData.append('file', files[0]);
    this.crudService.post('/v1/private/file', formData)
      .subscribe(data => {
        console.log(data);
        this.loadingList = false;
        // this.uploadedFiles = data.content;
      }, error => {
        this.loadingList = false;

      });


  }
  removeImage() {
    console.log('removeImage');
  }
}
