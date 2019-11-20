import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { OptionValuesService } from '../services/option-values.service';
import { ShowcaseDialogComponent } from '../../../shared/components/showcase-dialog/showcase-dialog.component';
import { NbDialogService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-options-values-list',
  templateUrl: './options-values-list.component.html',
  styleUrls: ['./options-values-list.component.scss']
})
export class OptionsValuesListComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  optionValues = [];
  loadingList = false;

  // paginator
  perPage = 20;
  currentPage = 1;
  totalCount;

  // request params
  params = {
    lang: 'en',
    count: this.perPage,
    page: 0
  };
  settings = {};

  constructor(
    private translate: TranslateService,
    private optionValuesService: OptionValuesService,
    private router: Router,
    private dialogService: NbDialogService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.loadingList = true;
    this.params.page = this.currentPage - 1;
    this.optionValuesService.getListOfOptionValues(this.params)
      .subscribe(res => {
        this.totalCount = res.recordsTotal;
        this.optionValues = [...res.optionValues];
        this.source.load(res.optionValues);
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
      delete: {
        deleteButtonContent: '<i class="fas fa-trash-alt"></i>',
        confirmDelete: true
      },
      actions: {
        columnTitle: '',
        add: false,
        edit: false,
        delete: true,
        position: 'right',
        sort: true,
      },
      pager: {
        display: false
      },
      columns: {
        id: {
          title: this.translate.instant('COMMON.ID'),
          type: 'number',
          editable: false
        },
        code: {
          title: this.translate.instant('COMMON.CODE'),
          type: 'string',
          editable: false
        },
        description: {
          title: this.translate.instant('COMMON.NAME'),
          type: 'html',
          editable: false,
          valuePrepareFunction: (description) => {
            const id = this.optionValues.find(el => el.description.name === description.name).id;
            return `<a href="#/pages/catalogue/options/option-value/${id}">${description.name}</a>`;
          }
        }
      },
    };
  }

  deleteRecord(event) {
    this.dialogService.open(ShowcaseDialogComponent, {})
      .onClose.subscribe(res => {
      if (res) {
        event.confirm.resolve();
        this.optionValuesService.deleteOptionValue(event.data.id)
          .subscribe(result => {
            this.toastr.success(this.translate.instant('OPTION_VALUE.OPTION_VALUE_REMOVED'));
            this.getList();
          });
      } else {
        event.confirm.reject();
      }
    });
  }

  // paginator
  changePage(event) {
    switch (event.action) {
      case 'onPage': {
        this.currentPage = event.data;
        break;
      }
      case 'onPrev': {
        this.currentPage--;
        break;
      }
      case 'onNext': {
        this.currentPage++;
        break;
      }
      case 'onFirst': {
        this.currentPage = 1;
        break;
      }
      case 'onLast': {
        this.currentPage = event.data;
        break;
      }
    }
    this.getList();
  }

}
