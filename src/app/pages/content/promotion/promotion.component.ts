import { Component, OnInit } from '@angular/core';
import { QueryBuilderConfig } from 'angular2-query-builder';
@Component({
    selector: 'ngx-promotion',
    templateUrl: './promotion.component.html',
    styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {
    query = {
        condition: 'and',
        rules: [
            { field: 'age', operator: '<=', value: 'Bob' },
            { field: 'gender', operator: '>=', value: 'm' }
        ]
    };

    config: QueryBuilderConfig = {
        fields: {
            age: { name: 'Age', type: 'number' },
            gender: {
                name: 'Gender',
                type: 'category',
                options: [
                    { name: 'Male', value: 'm' },
                    { name: 'Female', value: 'f' }
                ]
            }
        }
    }
    constructor() { }

    ngOnInit() {
    }

}
