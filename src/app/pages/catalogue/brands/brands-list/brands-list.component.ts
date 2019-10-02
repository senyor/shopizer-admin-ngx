import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { BrandService } from '../services/brand.service';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../../shared/components/showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.scss']
})
export class BrandsListComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  perPage = 10;
  loadingList = false;
  settings = {};

  constructor(
    private brandService: BrandService,
    private router: Router,
    private _sanitizer: DomSanitizer,
    private dialogService: NbDialogService,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.loadingList = true;
    this.brandService.getListOfBrands()
      .subscribe(brands => {
        this.source.load(brands);
        this.source.setPaging(1, this.perPage, true);
        this.loadingList = false;
      });
    this.setSettings();
    this.translate.onLangChange.subscribe((event) => {
      this.setSettings();
    });
  }

  setSettings() {
    this.settings = {
      actions: {
        columnTitle: '',
        add: false,
        edit: false,
        delete: false,
        position: 'right',
        sort: true,
        custom: [
          { name: 'details', title: `${this.translate.instant('common.edit')}` },
          { name: 'remove', title: this._sanitizer.bypassSecurityTrustHtml('<i class="fas fa-trash-alt"></i>') }
        ],
      },
      columns: {
        id: {
          filter: false,
          title: 'ID',
          type: 'number',
        },
        description: {
          title: this.translate.instant('brand.brandName'),
          type: 'string',
          valuePrepareFunction: (description) => {
            if (description) {
              return description.name;
            }
          }
        },
        code: {
          title: this.translate.instant('common.code'),
          type: 'string',
        },
      },
    };
  }

  route(event) {
    switch (event.action) {
      case 'details':
        this.router.navigate(['pages/catalogue/brands/brand/', event.data.id]);
        break;
      case 'remove':
      this.dialogService.open(ShowcaseDialogComponent, {})
        .onClose.subscribe(res => {
        if (res) {
          this.brandService.deleteBrand(event.data.id)
            .subscribe(data => {
              this.getList();
            });
        }
      });
    }
  }

}
