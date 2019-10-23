import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { InventoryService } from '../services/inventory.service';

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
    private inventoryService: InventoryService
  ) {
    const productId = this.activatedRoute.snapshot.paramMap.get('productId');
    const inventoryId = this.activatedRoute.snapshot.paramMap.get('inventoryId');
    this.inventoryService.getInventoryById(productId, inventoryId).subscribe((res) => {
      console.log(res);
      this.inventory = {...res};
    });
  }

  ngOnInit() {
  }

  backToList() {
    this.location.back();
  }

}
