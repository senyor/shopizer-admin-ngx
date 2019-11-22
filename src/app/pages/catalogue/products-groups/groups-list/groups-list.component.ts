import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ShowcaseDialogComponent } from '../../../shared/components/showcase-dialog/showcase-dialog.component';
import { ProductGroupsService } from '../services/product-groups.service';
import { ActiveButtonComponent } from './active-button.component';

@Component({
  selector: 'ngx-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  loadingList = false;

  settings = {};

  constructor(
    private dialogService: NbDialogService,
    private translate: TranslateService,
    private productGroupsService: ProductGroupsService
  ) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.loadingList = true;
    this.productGroupsService.getListOfProductGroups().subscribe(res => {
      console.log(res);
      this.source.load(res);
      this.loadingList = false;
    });
    this.setSettings();
    this.translate.onLangChange.subscribe((event) => {
      this.setSettings();
    });
  }

  setSettings() {
    this.settings = {
      mode: 'inline',
      edit: {
        editButtonContent: this.translate.instant('COMMON.EDIT'),
        saveButtonContent: '<i class="fas fa-check"></i>',
        cancelButtonContent: '<i class="fas fa-times"></i>',
        confirmSave: true
      },
      delete: {
        deleteButtonContent: '<i class="fas fa-trash-alt"></i>',
        confirmDelete: true
      },
      actions: {
        columnTitle: '',
        add: false,
        edit: true,
        delete: true,
        position: 'right',
        sort: true,
      },
      columns: {
        code: {
          title: this.translate.instant('COMMON.CODE'),
          type: 'string',
          editable: false
        },
        active: {
          filter: false,
          title: this.translate.instant('COMMON.ACTIVE'),
          type: 'custom',
          renderComponent: ActiveButtonComponent,
          defaultValue: false,
          editable: true,
          editor: {
            type: 'checkbox'
          }
        },
      },
    };
  }

  deleteRecord(event) {
    this.dialogService.open(ShowcaseDialogComponent, {})
      .onClose.subscribe(res => {
      if (res) {
        event.confirm.resolve();
        this.productGroupsService.removeProductGroup(event.data.id)
          .subscribe(result => {
            this.getList();
          });
      } else {
        event.confirm.reject();
      }
    });
  }

}
