import { Component } from '@angular/core';

@Component({
  selector: 'ngx-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.scss']
})
export class ContentManagementComponent {
  tabs: any[] = [
    {
      title: 'FileExplorer',
      route: ['file-explorer'],
      responsive: true,
    }
  ];

  constructor() {
  }
}
