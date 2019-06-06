import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.scss']
})
export class CreateNewUserComponent implements OnInit {
  path = 'User';
  user = {};

  constructor() {
  }

  ngOnInit() {
  }

}
