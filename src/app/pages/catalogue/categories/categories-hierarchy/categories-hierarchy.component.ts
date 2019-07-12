import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../services/category.service';

@Component({
  selector: 'ngx-categories-hierarchy',
  templateUrl: './categories-hierarchy.component.html',
  styleUrls: ['./categories-hierarchy.component.scss']
})
export class CategoriesHierarchyComponent implements OnInit {
  nodes = [];
  options = {
    allowDrag: (node) => {
      return node.data.parent;
    },
    allowDrop: (element, { parent, index }) => {
      if (parent.data.hasOwnProperty('virtual')) {
        return !parent.data.virtual;
      } else {
        return !parent.isRoot;

      }
    },
  };

  options2 = {
    allowDrag: true,
    allowDrop: true
  };
  loader = false;

  constructor(
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit() {
    this.loader = true;
    this.getList();
  }

  getList() {
    this.categoryService.getListOfCategories()
      .subscribe(categories => {
        categories.forEach((el) => {
          this.transformList(el);
        });
        const rootObject = {
          id: 0,
          name: 'root',
          children: [...categories]
        };
        this.nodes.push(rootObject);
        this.loader = false;
      });
  }

  transformList(node) {
    node.name = node.description.name;
    if (node.children && node.children.length !== 0) {
      node.children.forEach((el) => {
        this.transformList(el);
      });
    }
  }

  onMoveNode(event) {
    this.categoryService.updateHierarchy(event.node.id, event.to.parent.id)
      .subscribe(res => {
        console.log(res);
      });
  }

}
