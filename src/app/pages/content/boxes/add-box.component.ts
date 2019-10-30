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
  languages: Array<any> = [{ 'code': 'en', 'name': 'English' }, { 'code': 'fr', 'name': 'French' }]
  page = {
    visible: false,
    mainmenu: false,
    code: '',
    order: '',
    language: 'en',
    ePagename: '',
    // fPagename: '',
    // eUrl: '',
    // fUrl: '',
    ePagecontent: '',
    // fPagecontent: ''
  }
  constructor(
    // private appService: AppService
  ) {

  }


}
