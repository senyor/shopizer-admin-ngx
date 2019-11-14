import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CrudService } from '../../shared/services/crud.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'add-box',
  templateUrl: './add-box.component.html',
  styleUrls: ['./add-box.component.scss'],
})
export class AddBoxComponent {
  loadingList = false;
  languages: Array<any> = [{ 'code': 'en', 'name': 'English' }, { 'code': 'fr', 'name': 'French' }]
  page = {
    visible: false,
    mainmenu: false,
    code: '',
    order: '',
    language: 'en',
    ePagename: '',
    ePagecontent: '',
  }
  public scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
  constructor(
    private crudService: CrudService,
    public router: Router,
    private toastr: ToastrService,
  ) {

  }
  createBoxes() {
    this.loadingList = true;
    let param = {
      "code": this.page.code,
      "descriptions": [
        {
          "contentType": "BOXES",
          "language": 'en',
          "name": this.page.ePagename,
          "pageContent": this.page.ePagecontent
        },
        {
          "contentType": "BOXES",
          "language": 'fr',
          "name": this.page.ePagename,
          "pageContent": this.page.ePagecontent
        }
      ],
      "displayedInMenu": this.page.mainmenu
    }
    this.crudService.post('/v1/private/content/page', param)
      .subscribe(data => {
        this.loadingList = false;
        this.toastr.success('Boxe added successfully');
        // this.buttonText = 'Update';
        // this.titleText = 'Update Manage Page';
        // this.getContentDetails();
        // this.router.navigate(['/pages/content/pages/list']);
      }, error => {
        this.loadingList = false;
      });
  }

}
