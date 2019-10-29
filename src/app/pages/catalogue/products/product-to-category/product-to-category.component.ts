import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../categories/services/category.service';
import { ProductService } from '../services/product.service';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-product-to-category',
  templateUrl: './product-to-category.component.html',
  styleUrls: ['./product-to-category.component.scss']
})
export class ProductToCategoryComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  loadingList = false;
  categories = [];
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

  availableList: any[];
  selectedList: any[];

  constructor(
    private translate: TranslateService,
    private categoryService: CategoryService,
    private productService: ProductService
    ) { }

  ngOnInit() {
    this.getList();
    this.productService.getListOfProducts({})
      .subscribe(res => {
        this.availableList = [...res.products];
        this.selectedList = [];
      });
  }

  getList() {
    this.categories = [];
    this.params.page = this.currentPage - 1;
    this.loadingList = true;
    this.categoryService.getListOfCategories(this.params)
      .subscribe(categories => {
        categories.categories.forEach((el) => {
          this.getChildren(el);
        });
        this.totalCount = categories.totalPages;
        this.source.load(this.categories);
        this.loadingList = false;
      });
    this.translate.onLangChange.subscribe((event) => {
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

}
