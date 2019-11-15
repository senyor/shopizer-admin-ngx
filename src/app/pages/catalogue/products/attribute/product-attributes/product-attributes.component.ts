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
      data: {
        id: 0,
        parentName: 'Group1',
        option: '',
        optionValue: '',
        attributeDisplayOnly: true,
        productAttributePrice: 0,
        sortOrder: 0,
        parent: true,
      },
      expanded: true,
      children: [
        {
          data: {
            id: 123,
            option: 'option',
            optionValue: 'optionValue',
            attributeDisplayOnly: true,
            productAttributePrice: 123,
            sortOrder: 0,
          }
        },
        {
          data: {
            id: 123,
            option: 'option',
            optionValue: 'optionValue',
            attributeDisplayOnly: true,
            productAttributePrice: 123,
            sortOrder: 0,
          }
        }
      ]
    },
    {
      data: {
        id: 123,
        parentName: 'Group2',
        option: 'option',
        optionValue: 'optionValue',
        attributeDisplayOnly: true,
        productAttributePrice: 123,
        sortOrder: 0,
        parent: true,
      },
      expanded: true,
      children: [
        {
          data: {
            id: 123,
            option: 'option',
            optionValue: 'optionValue',
            attributeDisplayOnly: true,
            productAttributePrice: 123,
            sortOrder: 0,
          }
        },
        {
          data: {
            id: 123,
            option: 'option',
            optionValue: 'optionValue',
            attributeDisplayOnly: true,
            productAttributePrice: 123,
            sortOrder: 0,
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
