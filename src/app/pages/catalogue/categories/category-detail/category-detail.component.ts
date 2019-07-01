import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CategoryService } from '../services/category.service';

@Component({
  selector: 'ngx-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  category: any;

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    ) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.categoryService.getCategoryById(id)
      .subscribe(res => {
        this.category = res;
      });
  }

}
