import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TreeNode } from 'primeng/primeng';
import { ProductAttributesService } from '../../services/product-attributes.service';
import { OptionService } from '../../../options/services/option.service';
import { Attribute } from '../model/attribute';

export interface TreeNode {
  data?: Attribute;
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
  options = [];

  constructor(
    private productAttributesService: ProductAttributesService,
    private optionService: OptionService,
    private activatedRoute: ActivatedRoute
  ) {
    this.optionService.getListOfOptions({ count: 1000 })
      .subscribe(res => {
        this.options = [...res.options];
      });
  }

  ngOnInit() {
    this.loader = true;
    this.productId = this.activatedRoute.snapshot.paramMap.get('productId');
    this.productAttributesService.getListOfProductsAttributes(this.productId, { count: 1000 })
      .subscribe(res => {
        const newArr = this.prepareData(res.attributes);
        this.data = [...newArr];
        this.loader = false;
      });
  }

  prepareData(basicArray) {
    const parentArray = [];
    // create options groups
    this.options.forEach((option) => {
      const parent: TreeNode = {
        data: {
          id: option.id,
          parentName: option.code,
          parent: true,
          empty: false
        },
        expanded: true,
        children: []
      };
      parentArray.push(parent);
    });
    // fill each group by data
    parentArray.forEach((parent) => {
      basicArray.forEach((attribute) => {
        if (parent.data.parentName === attribute.option.code) {
          parent.children.push({
            data: {
              ...attribute,
              option: attribute.option.code,
              optionValue: attribute.optionValue.code,
            }
          });
        }
      });
    });
    // find empty children's arrays
    parentArray.forEach((parent) => {
      if (parent.children.length === 0) {
        parent.data.empty = true;
      }
    });
    return parentArray;
  }

}
