import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TreeNode } from 'primeng/primeng';
import { ProductAttributesService } from '../../services/product-attributes.service';

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
  productId;
  loader = false;
  data: TreeNode[] = [];
  dataMock: TreeNode[] = [
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
            id: 1,
            'name': 'Work',
            'size': '55kb',
            'type': 'Folder'
          }
        },
        {
          'data': {
            id: 2,
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
            id: 3,
            'name': 'barcelona.jpg',
            'size': '90kb',
            'type': 'Picture'
          }
        },
        {
          'data': {
            id: 4,
            'name': 'primeui.png',
            'size': '30kb',
            'type': 'Picture'
          }
        },
        {
          'data': {
            id: 5,
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
    this.loader = true;
    this.productId = this.activatedRoute.snapshot.paramMap.get('productId');
    this.productAttributesService.getListOfProductsAttributes(this.productId, {}).subscribe(res => {
      console.log(res);
      // this.data = [...res.attributes];
      this.data = [...this.dataMock];
      this.loader = false;
    });
  }

  ngOnInit() {
  }

}
