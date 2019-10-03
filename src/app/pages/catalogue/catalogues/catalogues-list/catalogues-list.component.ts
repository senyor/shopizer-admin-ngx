import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-catalogues-list',
  templateUrl: './catalogues-list.component.html',
  styleUrls: ['./catalogues-list.component.scss']
})
export class CataloguesListComponent implements OnInit {
  isRed = 'false';
  list1: any[];

  list2: any[];

  constructor() {
  }

  ngOnInit() {
    this.list1 = [{
      'id': 1,
      'code': 'DEFAULT1',
      'descriptions': [
        {
          'id': 600,
          'language': null,
          'name': 'DEFAULT123',
          'description': 'DEFAULT',
          'friendlyUrl': null,
          'keyWords': null,
          'highlights': null,
          'metaDescription': null,
          'title': null
        },
        {
          'id': 600,
          'language': null,
          'name': 'DEFAULT321',
          'description': 'DEFAULT',
          'friendlyUrl': null,
          'keyWords': null,
          'highlights': null,
          'metaDescription': null,
          'title': null
        }
      ]
    }, {
      'id': 1,
      'code': 'DEFAULT2',
      'descriptions': [
        {
          'id': 600,
          'language': null,
          'name': 'DEFAULT22222222222',
          'description': 'DEFAULT',
          'friendlyUrl': null,
          'keyWords': null,
          'highlights': null,
          'metaDescription': null,
          'title': null
        },
        {
          'id': 600,
          'language': null,
          'name': 'DEFAULT3333333333333',
          'description': 'DEFAULT',
          'friendlyUrl': null,
          'keyWords': null,
          'highlights': null,
          'metaDescription': null,
          'title': null
        }
      ]
    }
    ];
    this.list2 = [];
  }

}
