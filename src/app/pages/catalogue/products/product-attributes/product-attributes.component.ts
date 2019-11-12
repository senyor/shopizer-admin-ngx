import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TreeNode } from 'primeng/primeng';
import { ProductAttributesService } from '../services/product-attributes.service';

export interface TreeNode {
  data?: any;
  children?: TreeNode[];
  leaf?: boolean;
  expanded: boolean;
}

@Component({
  selector: 'ngx-product-attributes',
  templateUrl: './product-attributes.component.html',
  styleUrls: ['./product-attributes.component.scss']
})
export class ProductAttributesComponent implements OnInit {

  files: TreeNode[];
  data = [
    {
      'data': {
        'name': 'Documents',
        'size': '',
        'type': '',
        'parent': true,
      },
      'expanded': true,
      'children': [
        {
          'data': {
            'name': 'Work',
            'size': '55kb',
            'type': 'Folder'
          }
        },
        {
          'data': {
            'name': 'Home',
            'size': '20kb',
            'type': 'Folder'
          }
        }
      ]
    },
    {
      'data': {
        'name': 'Pictures',
        'size': '150kb',
        'type': 'Folder',
        'parent': true,
      },
      'expanded': true,
      'children': [
        {
          'data': {
            'name': 'barcelona.jpg',
            'size': '90kb',
            'type': 'Picture'
          }
        },
        {
          'data': {
            'name': 'primeui.png',
            'size': '30kb',
            'type': 'Picture'
          }
        },
        {
          'data': {
            'name': 'optimus.jpg',
            'size': '30kb',
            'type': 'Picture'
          }
        }
      ]
    }
  ];

  constructor(
    private productAttributesService: ProductAttributesService,
    private activatedRoute: ActivatedRoute
  ) {
    const productId = this.activatedRoute.snapshot.paramMap.get('productId');
    this.productAttributesService.getListOfProductsAttributes(productId, {}).subscribe(res => {
      console.log(res);
    });
  }

  ngOnInit() {
   this.files = this.data;
  }

}
