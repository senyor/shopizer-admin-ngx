import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { CategoryService } from '../services/category.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ButtonRenderComponent } from './button-render.component';
import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from './showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  perPage = 10;
  loadingList = false;
  categories = [];
  buttonDetails = '<button class="btn btn-primary cell-style" ' +
    'style="padding: 2px 15px; margin: 10px 0px !important;"><span>Details</span></button>';
  buttonRemove = '<button class="btn btn-danger  cell-style" ' +
    'style="padding: 2px 15px; margin-bottom: 10px !important;"><span>Remove</span></button>';


  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private _sanitizer: DomSanitizer,
    private dialogService: NbDialogService
  ) {
  }

  ngOnInit() {
    this.getList();
  }

  getChildren(node) {
    if (node.children && node.children.length !== 0) {
      this.categories.push(node);
      node.children.forEach((el) => {
        this.getChildren(el);
      });
    } else {
      this.categories.push(node);
    }
  }

  getList() {
    this.categories = [];
    this.loadingList = true;
    this.categoryService.getListOfCategories()
      .subscribe(categories => {
        categories.forEach((el) => {
          this.getChildren(el);
        });
        this.source.load(this.categories);
        this.source.setPaging(1, this.perPage, true);
        this.loadingList = false;
      });
  }

  settings = {
    actions: {
      columnTitle: '',
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      sort: true,
      custom: [
        { name: 'details', title: this._sanitizer.bypassSecurityTrustHtml(this.buttonDetails) },
        { name: 'remove', title: this._sanitizer.bypassSecurityTrustHtml(this.buttonRemove) }
      ],
    },
    columns: {
      id: {
        filter: false,
        title: 'ID',
        type: 'number',
      },
      description: {
        title: 'Name',
        type: 'string',
        valuePrepareFunction: (description) => {
          if (description) {
            return description.name;
          }
        }
      },
      code: {
        title: 'Code',
        type: 'string',
      },
      parent: {
        title: 'Parent',
        type: 'string',
        valuePrepareFunction: (parent) => {
          return parent ? parent.code : 'root';
        }
      },
      visible: {
        filter: false,
        title: 'Visible',
        type: 'custom',
        renderComponent: ButtonRenderComponent,
        defaultValue: false,
        // type: 'html',
        // valuePrepareFunction: (data) => {
        //   console.log(data);
        //   return this._sanitizer.bypassSecurityTrustHtml('<input type="checkbox" [checked]="data">');
        // }
      },
    },
  };

  // onUserRowSelect (event) {
  //   event.data.visible = event.isSelected;
  //   console.log(event);
  //   return event.isSelected;
  // }

  route(event) {
    switch (event.action) {
      case 'details':
        this.router.navigate(['pages/catalogue/categories/category/', event.data.id]);
        break;
      case 'remove':
        this.dialogService.open(ShowcaseDialogComponent, {})
          .onClose.subscribe(res => {
          if (res) {
            this.categoryService.deleteCategory(event.data.id)
              .subscribe(data => {
                this.getList();
              });
          }
        });
    }
  }

}
