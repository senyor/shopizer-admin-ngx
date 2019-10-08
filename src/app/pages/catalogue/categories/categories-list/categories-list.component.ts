import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { CategoryService } from '../services/category.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ButtonRenderComponent } from './button-render.component';
import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../../shared/components/showcase-dialog/showcase-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from '../../products/services/product.service';

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
  settings = {};

  availableList: any[];
  selectedList: any[];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private _sanitizer: DomSanitizer,
    private dialogService: NbDialogService,
    private translate: TranslateService,
    private productService: ProductService
  ) {
  }

  ngOnInit() {
    this.getList();
    this.productService.getListOfProducts({})
      .subscribe(res => {
        this.availableList = [...res.products];
        this.selectedList = [];
      });
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
    this.setSettings();
    this.translate.onLangChange.subscribe((event) => {
      this.setSettings();
    });
  }

  setSettings() {
    this.settings = {
      actions: {
        columnTitle: '',
        add: false,
        edit: false,
        delete: false,
        position: 'right',
        sort: true,
        custom: [
          { name: 'details', title: `${this.translate.instant('common.edit')}` },
          { name: 'remove', title: this._sanitizer.bypassSecurityTrustHtml('<i class="fas fa-trash-alt"></i>') }
        ],
      },
      columns: {
        id: {
          filter: false,
          title: 'ID',
          type: 'number',
        },
        description: {
          title: this.translate.instant('category.categoryName'),
          type: 'string',
          valuePrepareFunction: (description) => {
            if (description) {
              return description.name;
            }
          }
        },
        code: {
          title: this.translate.instant('category.code'),
          type: 'string',
        },
        parent: {
          title: this.translate.instant('category.parent'),
          type: 'string',
          valuePrepareFunction: (parent) => {
            return parent ? parent.code : 'root';
          }
        },
        visible: {
          filter: false,
          title: this.translate.instant('common.visible'),
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
  }



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
