import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
// import { NbComponentStatus } from '@nebular/theme';
// import { SmartTableData } from '../../../@core/data/smart-table';
// import { AppService } from '../../../directive/app.service';
// import { Action } from '../../../directive/app.constants';
@Component({
  selector: 'add-box',
  templateUrl: './add-box.component.html',
  styleUrls: ['./add-box.component.scss'],
})
export class AddBoxComponent {

  page = {
    visible: false,
    mainmenu: false,
    code: '',
    order: '',
    ePagename: '',
    fPagename: '',
    // eUrl: '',
    // fUrl: '',
    ePagecontent: '',
    fPagecontent: '',
    // eTitle: '',
    // fTitle: '',
    // eKeyword: '',
    // fKeyword: '',
    // eProduct_group: '',
    // fProduct_group: '',
    // eDescription: '',
    // fDescription: ''
  }
  constructor(
    // private appService: AppService
  ) {

  }


}
