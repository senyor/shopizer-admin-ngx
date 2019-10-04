import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CrudService } from '../../shared/services/crud.service';
@Component({
  selector: 'files-content',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent {
  loadingList = false;
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
          name: 'delete',
          title: '<i class="nb-trash"></i>'
        }
      ]
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      path: {
        title: 'URL',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          console.log(row);
          return row.path + row.name
        }
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private crudService: CrudService
  ) {
    this.getFiles()
  }
  getFiles() {
    this.loadingList = true;
    this.crudService.get('/v1/content/folder')
      .subscribe(data => {
        this.loadingList = false;
        this.source = data.content;
      }, error => {
        this.loadingList = false;

      });
  }

}
