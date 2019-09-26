import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
// import { SmartTableData } from '../../../@core/data/smart-table';
// import { AppService } from '../../../directive/app.service';
// import { Action } from '../../../directive/app.constants';
import { CrudService } from '../../shared/services/crud.service';
import { Router } from '@angular/router';
@Component({
  selector: 'page-table',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent {
  settings = {
    mode: 'external',
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        {
          name: 'edit',
          title: '<i class="nb-edit"></i>'
        },
        {
          name: 'delete',
          title: '<i class="nb-trash"></i>'
        },
        {
          name: 'delete',
          title: '<i class="nb-info"></i>'
        }
      ]
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      code: {
        title: 'Code',
        type: 'string',
      },
      name: {
        title: 'Name',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private crudService: CrudService,
    // private appService: AppService,
    public router: Router
  ) {
    this.getPages()
  }
  getPages() {
    // let action = Action.CONTENT + Action.PAGES;

    this.crudService.get('/v1/content/pages')
      .subscribe(data => {
        console.log(data, '************')
        this.source = data;
      }, error => {
        // this.router.navigate(['/error']);
      });
  }
  addPages() {
    this.router.navigate(['/pages/content/pages/add']);
  }

  // onDeleteConfirm(event): void {
  //   if (window.confirm('Are you sure you want to delete?')) {
  //     event.confirm.resolve();
  //   } else {
  //     event.confirm.reject();
  //   }
  // }
}
