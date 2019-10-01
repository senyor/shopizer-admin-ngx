import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CrudService } from '../../shared/services/crud.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent {
  loadingList = false;
  page = {
    visible: false,
    mainmenu: false,
    code: '',
    order: '',
    ePagename: '',
    fPagename: '',
    eUrl: '',
    fUrl: '',
    ePagecontent: '',
    fPagecontent: '',
    eTitle: '',
    fTitle: '',
    eKeyword: '',
    fKeyword: '',
    eProduct_group: '',
    fProduct_group: '',
    eDescription: '',
    fDescription: ''
  }
  constructor(
    private crudService: CrudService,
    public router: Router,
    private toastr: ToastrService,
  ) {

  }
  createPages() {
    this.loadingList = true;
    let param = {
      'code': this.page.code,
      'name': this.page.ePagename,
      'contentType': 'PAGE',
      'displayedInMenu': this.page.mainmenu,
      'metaDetails': this.page.eDescription,
      'pageContent': this.page.ePagecontent,
      'path': '',
      'slug': this.page.eUrl,
      'title': this.page.eTitle
    }
    this.crudService.post('/v1/private/content/page', param)
      .subscribe(data => {
        console.log(data);
        this.loadingList = false;
        this.toastr.success('Page added successfully');
        this.router.navigate(['/pages/content/pages/list']);
      }, error => {
        this.loadingList = false;
      });
  }


}
