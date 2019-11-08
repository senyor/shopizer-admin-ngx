import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { OptionService } from '../services/option.service';
import { TranslateService } from '@ngx-translate/core';
import { OptionValuesService } from '../services/option-values.service';

@Component({
  selector: 'ngx-options-values-list',
  templateUrl: './options-values-list.component.html',
  styleUrls: ['./options-values-list.component.scss']
})
export class OptionsValuesListComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  data;
  loadingList = false;

  settings = {};

  constructor(
    private optionService: OptionService,
    private translate: TranslateService,
    private optionValuesService: OptionValuesService,
  ) {
    this.optionValuesService.getListOfOptions({}).subscribe(res => {
      console.log(res);
    });
  }

  ngOnInit() {
    this.getList();
    this.setSettings();
    this.translate.onLangChange.subscribe((event) => {
      this.setSettings();
    });
  }

  getList() {
    // this.optionService.getListOfOptions({})
    this.data = [
      { 'display': false, 'code': 'Color', 'name': 'Color', 'id': 1, 'type': 'radio', lastModif: '123'},
      { 'display': false, 'code': 'Size', 'name': 'Size', 'id': 2, 'type': 'select', lastModif: '123' }
    ];

    this.source.load(this.data);
  }

  setSettings() {
    this.settings = {
      mode: 'inline',
      // edit: {
      //   editButtonContent: this.translate.instant('COMMON.EDIT'),
      //   saveButtonContent: '<i class="fas fa-check"></i>',
      //   cancelButtonContent: '<i class="fas fa-times"></i>',
      //   confirmSave: true
      // },
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
        name: {
          title: this.translate.instant('COMMON.NAME'),
          type: 'html',
          editable: false,
          valuePrepareFunction: (name) => {
            const id = this.data.find(el => el.name === name).id;
            return `<a href="#/pages/catalogue/options/option-value/${ id }">${ name }</a>`;
          }
        },
        lastModif: {
          title: this.translate.instant('COMMON.LAST_MODIFIED'),
          type: 'string',
          editable: false,
        }
      },
    };
  }

}
