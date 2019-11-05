import { Component, OnInit } from '@angular/core';

import { OptionService } from '../services/option.service';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-options-list',
  templateUrl: './options-list.component.html',
  styleUrls: ['./options-list.component.scss']
})
export class OptionsListComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  loadingList = false;
  options = [];
  settings = {};

  // paginator
  perPage = 10;
  currentPage = 1;
  totalCount;

  // request params
  params = {
    lang: 'en',
    count: this.perPage,
    page: 0
  };

  constructor(
    private optionService: OptionService,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.options = [];
    this.params.page = this.currentPage - 1;
    this.loadingList = true;
    this.optionService.getListOfOptions(this.params).subscribe((res) => {
      // console.log(res);
      this.totalCount = res.totalPages;
      this.options = [...res.options];
      this.source.load(this.options);
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
        description: {
          title: this.translate.instant('COMMON.NAME'),
          type: 'html',
          editable: false,
          valuePrepareFunction: (description) => {
            // TODO should to be DESCRIPTIONS ARRAY
            const name = description.name;
            const id = this.options.find(el => el.description.name === name).id;
            return `<a href="#/pages/catalogue/options/option/${ id }">${ name }</a>`;
          }
        }
      },
    };
  }

  route(event) {
    // switch (event.action) {
    //   case 'details':
    //     this.router.navigate(['pages/catalogue/categories/category/', event.data.id]);
    //     break;
    //   case 'remove':
    //     this.dialogService.open(ShowcaseDialogComponent, {})
    //       .onClose.subscribe(res => {
    //       if (res) {
    //         this.categoryService.deleteCategory(event.data.id)
    //           .subscribe(data => {
    //             this.getList();
    //           });
    //       }
    //     });
    // }
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
