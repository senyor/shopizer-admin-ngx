import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CrudService } from '../../shared/services/crud.service';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../shared/components/showcase-dialog/showcase-dialog.component';
import { ToastrService } from 'ngx-toastr';
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
        }
        // {
        //   name: 'delete',
        //   title: '<i class="nb-info"></i>'
        // }
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
  loadingList = false;
  constructor(
    private crudService: CrudService,
    public router: Router,
    private dialogService: NbDialogService,
    private toastr: ToastrService
  ) {
    this.getPages()
  }
  getPages() {

    this.crudService.get('/v1/content/pages')
      .subscribe(data => {
        console.log(data, '************')
        this.source = data;
      }, error => {
      });
  }
  addPages() {
    localStorage.setItem('contentpageid', '');
    this.router.navigate(['/pages/content/pages/add']);
  }
  onClickAction(event) {
    switch (event.action) {
      case 'edit':
        this.onEdit(event);
        break;
      case 'delete':
        this.onDelete(event);

    }

  }
  onEdit(event) {
    localStorage.setItem('contentpageid', event.data.code);
    this.router.navigate(['/pages/content/pages/add']);
  }
  onDelete(event) {
    this.loadingList = true;
    console.log(event);
    this.dialogService.open(ShowcaseDialogComponent, {})
      .onClose.subscribe(res => {
        if (res) {
          console.log('fsdfsfdf');
          this.crudService.delete('/v1/private/content/page/' + event.data.id + '?id=' + event.data.id)
            .subscribe(data => {
              this.loadingList = false;
              this.toastr.success('Page deleted successfully');
              this.getPages();
            }, error => {
              this.loadingList = false;
            });
        } else {
          this.loadingList = false;
        }
      });
  }
  // onDeleteConfirm(event): void {
  //   if (window.confirm('Are you sure you want to delete?')) {
  //     event.confirm.resolve();
  //   } else {
  //     event.confirm.reject();
  //   }
  // }
}
