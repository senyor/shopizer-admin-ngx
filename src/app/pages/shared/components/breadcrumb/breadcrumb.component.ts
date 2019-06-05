import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: [ './breadcrumb.component.scss' ]
})
export class BreadcrumbComponent implements OnInit {
  @Input() path: any;

  constructor() {
  }

  ngOnInit() {
  }

}
