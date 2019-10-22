import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.scss']
})
export class InventoryDetailsComponent implements OnInit {
  inventory = {};

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) {
    const productId = this.activatedRoute.snapshot.paramMap.get('productId');
    const inventoryId = this.activatedRoute.snapshot.paramMap.get('inventoryId');
    console.log('productId', productId);
    console.log('inventoryId', inventoryId);
  }

  ngOnInit() {
    // TODO get inventory
  }

  backToList() {
    this.location.back();
  }

}
