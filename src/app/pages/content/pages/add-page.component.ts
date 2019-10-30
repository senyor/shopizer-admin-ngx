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
  visible: any = false;
  mainmenu: any = false;
  code: string = '';
  order: number = 0;
  language: string = 'en';
  en = {
    metaDetails: '',
    name: '',
    pageContent: '',
    path: '',
    slug: '',
    title: '',
    keyword: '',
    productGroup: ''
  }
  // fr = {
  //   metaDetails: '',
  //   name: '',
  //   pageContent: '',
  //   path: '',
  //   slug: '',
  //   title: '',
  //   keyword: '',
  //   productGroup: ''
  // }
  languages: Array<any> = [{ 'code': 'en', 'name': 'English' }, { 'code': 'fr', 'name': 'French' }]
  codeExits: any;
  message: string = '';
  constructor(
    private crudService: CrudService,
    public router: Router,
    private toastr: ToastrService,
  ) {
    if (localStorage.getItem('contentpageid')) {
      this.getContentDetails()
    }
  }
  getContentDetails() {

    this.crudService.get('/v1/content/pages/' + localStorage.getItem('contentpageid'))
      .subscribe(data => {
        console.log(data, '************')
        this.en = data;
        this.visible = data.displayedInMenu;
        this.mainmenu = data.displayedInMenu;
        this.code = data.code;
        this.order = 0;
      }, error => {
      });
  }
  focusOutFunction() {
    this.crudService.get('/v1/content/' + this.code)
      .subscribe(data => {
        this.codeExits = true;
        this.message = "This code already exist"
      }, error => {
        this.codeExits = false;
        this.message = "This code is available"
      });
  }
  urlTitle(event) {
    let text = event.target.value;
    var characters = [' ', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '_', '{', '}', '[', ']', '|', '/', '<', '>', ',', '.', '?', '--'];

    for (var i = 0; i < characters.length; i++) {
      var char = String(characters[i]);
      text = text.replace(new RegExp("\\" + char, "g"), '-');
    }
    text = text.toLowerCase();
    this.en.slug = text;
  }

  createPages() {
    this.loadingList = true;
    let param = {
      "code": this.code,
      "descriptions": [
        {
          "contentType": "PAGE",
          "language": this.language,
          "metaDetails": this.en.metaDetails,
          "name": this.en.name,
          "pageContent": this.en.pageContent,
          "slug": this.en.slug,
          "title": this.en.title
        }
      ],
      "displayedInMenu": this.mainmenu
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
