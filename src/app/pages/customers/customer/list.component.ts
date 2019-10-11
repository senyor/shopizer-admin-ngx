import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CrudService } from '../../shared/services/crud.service';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  settings = {
    mode: 'external',
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        {
          name: 'edit',
          title: '<i class="nb-edit"></i>'
        },
        // {
        //   name: 'delete',
        //   title: '<i class="nb-trash"></i>'
        // }
      ]
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      emailAddress: {
        title: 'Email',
        type: 'string',
      },
      country: {
        title: 'Country',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.billing.country
        }
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  loadingList = false;
  constructor(private crudService: CrudService, public router: Router) { }

  ngOnInit() {
    this.getCustomers();
  }
  getCustomers() {
    this.loadingList = true
    this.crudService.get('/v1/private/customers')
      .subscribe(data => {
        console.log(data, '************')
        this.source = data.customers;
        this.loadingList = false
      }, error => {
        this.loadingList = false
      });
  }
  addCustomer() {
    localStorage.setItem('customerid', '');
    this.router.navigate(['/pages/customer/add']);
  }
  onClickAction(event) {
    switch (event.action) {
      case 'edit':
        this.onEdit(event);
        break;

    }
  }
  onEdit(event) {
    console.log(event)
    localStorage.setItem('customerid', event.data.id);
    this.router.navigate(['/pages/customer/add']);
  }
}
