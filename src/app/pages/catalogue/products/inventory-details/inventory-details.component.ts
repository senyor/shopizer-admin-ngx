import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.scss']
})
export class InventoryDetailsComponent implements OnInit {
  inventory = {};

  constructor() { }

  ngOnInit() {
    // TODO get inventory
  }

}
