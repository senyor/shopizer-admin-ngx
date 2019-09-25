import { Component } from '@angular/core';
// import { LocalDataSource } from 'ng2-smart-table';
// import { SmartTableData } from '../../../@core/data/smart-table';
// import { AppService } from '../../../directive/app.service';
// import { Action } from '../../../directive/app.constants';

import { Router } from '@angular/router';
@Component({
  selector: 'images-table',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent {

  constructor(
    // private appService: AppService, 
    public router: Router
  ) {
    this.getImages()
  }
  getImages() {
    // let action = Action.CONTENT + Action.BOXES;

    // this.appService.getMethod(action)
    //   .subscribe(data => {
    //     this.source = data;
    //   }, error => {
    //     // this.router.navigate(['/error']);
    //   });
  }
}
