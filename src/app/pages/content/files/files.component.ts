import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CrudService } from '../../shared/services/crud.service';
import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../shared/components/showcase-dialog/showcase-dialog.component';
@Component({
  selector: 'files-content',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent {
  loadingList = false;
  isDisbaled = false;
  files: any;
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
    private crudService: CrudService,
    private dialogService: NbDialogService
  ) {
    this.getFiles()
  }
  onClickAction(event) {
    switch (event.action) {
      case 'delete':
        this.onDelete(event);

    }

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
  onChange(event) {
    this.isDisbaled = true;
    this.files = event.srcElement.files;
  }
  uploadFiles() {
    for (var i = 0; i < this.files.length; i++) {
      let formData = new FormData();
      formData.append('file', this.files[i]);
      this.crudService.post('/v1/private/file', formData)
        .subscribe(data => {
          console.log(data);
          this.loadingList = false;
          this.getFiles();
          // this.uploadedFiles = data.content;
        }, error => {
          this.loadingList = false;

        });
    }
  }
  onDelete(e) {
    // console.log(e);
    this.loadingList = true;
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: 'Are you sure!',
        body: 'Do you really want to remove this entity?'
      },
    })
      .onClose.subscribe(res => {
        if (res) {
          console.log('fsdfsfdf');
          this.crudService.delete('/v1/private/content/?contentType=IMAGE&name=' + e.data.name)
            .subscribe(data => {
              this.loadingList = false;
              // this.toastr.success('Page deleted successfully');
              this.getFiles();
            }, error => {
              this.loadingList = false;
            });
        } else {
          this.loadingList = false;
        }
      });
  }

}
