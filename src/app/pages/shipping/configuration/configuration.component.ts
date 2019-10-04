import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataSource } from 'ng2-smart-table';
import { CrudService } from '../../shared/services/crud.service';
import { Router } from '@angular/router';
@Component({
  selector: 'shipping-config',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent {

  loadingList = false;
  constructor(
    private crudService: CrudService
  ) {
    this.getCountry()

  }
  source: LocalDataSource = new LocalDataSource();
  settings = {
    mode: 'external',
    hideSubHeader: true,
    selectMode: 'multi',
    actions: {
      add: false,
      edit: false,
      delete: false,
      select: true
    },
    columns: {
      code: {
        title: 'Code',
        type: 'string',
      },
      name: {
        title: 'Name',
        type: 'string'
      }
    },
  };
  getCountry() {
    this.loadingList = true;
    this.crudService.get('/v1/country')
      .subscribe(data => {
        this.loadingList = false;
        this.source = data;
      }, error => {
        this.loadingList = false;

      });
  }

}
