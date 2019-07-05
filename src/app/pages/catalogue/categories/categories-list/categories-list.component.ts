import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { CategoryService } from '../services/category.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ButtonRenderComponent } from './button-render.component';

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

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private _sanitizer: DomSanitizer
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
    this.loadingList = true;
    this.categoryService.getListOfCategories()
      .subscribe(categories => {
        categories.forEach((el) => {
          this.getChildren(el);
        });
        this.categories.forEach(el => {
          el.idAdditional = el.id;
        });
        this.source.load(this.categories);
        this.source.setPaging(1, this.perPage, true);
        this.loadingList = false;
      });
  }

  settings = {
    actions: {
      columnTitle: 'Details',
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      sort: true,
      custom: [
        { name: 'ourCustomAction', title: 'Details' }
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
      // idAdditional: {
      //   filter: false,
      //   title: '',
      //   // type: 'number',
      //   type: 'html',
      //   valuePrepareFunction: (data) => {
      //     return this._sanitizer.bypassSecurityTrustHtml('<a value="data"><i class="fas fa-times"></i></a>');
      //   }
      // },
    },
  };

  // onUserRowSelect (event) {
  //   event.data.visible = event.isSelected;
  //   console.log(event);
  //   return event.isSelected;
  // }

  route(event) {
    this.router.navigate(['pages/catalogue/categories/category/', event.data.id]);
  }

}
