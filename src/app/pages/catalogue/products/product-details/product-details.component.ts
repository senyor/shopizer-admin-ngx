import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: {};
  loadingInfo = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) {
  }

  ngOnInit() {
    // this.loadingInfo = true;
    // const id = this.activatedRoute.snapshot.paramMap.get('id');
    // this.categoryService.getCategoryById(id)
    //   .subscribe(res => {
    //     this.category = res;
    //     this.loadingInfo = false;
    //   });
  }

  backToList() {
    this.location.back();
  }

}
