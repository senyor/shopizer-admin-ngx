import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [ './user-profile.component.scss' ]
})
export class UserProfileComponent implements OnInit {
  form: FormGroup;
  path = 'User';
  sidemenuTitle = 'User profile';
  sidemenuValue = 'admin';
  sidemenuLinks = [
    {
      title: 'My profile',
      link: ''
    },
    {
      title: 'Change password',
      link: ''
    }
  ];

  constructor(
    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.form = this.fb.group({
      firstname: [ '', [ Validators.required ] ],
      lastname: [ '', [ Validators.required ] ],
      username: [ '', [ Validators.required ] ],
      email: [ '', [ Validators.required ] ],
      active: [ '', [ Validators.required ] ],
      language: [ '', [ Validators.required ] ],
      groups: [ '', [ Validators.required ] ],
    });
  }

}
