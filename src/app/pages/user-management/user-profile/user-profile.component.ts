import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../shared/services/user.service';
import { ConfigService } from '../../shared/services/config.service';

@Component({
  selector: 'ngx-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [ './user-profile.component.scss' ]
})
export class UserProfileComponent implements OnInit {
  form: FormGroup;
  user: any;
  languages = [];
  groups = [];
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
    private userService: UserService,
    private configService: ConfigService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.configService.getListOfSupportedLanguages()
      .subscribe(languages => {
        this.languages = [...languages];
      });
    this.configService.getListOfGroups()
      .subscribe(groups => {
        this.groups = [...groups];
      });
    const id = this.userService.getUserId();
    this.userService.getUser(id)
      .subscribe(user => {
        this.user = user;
        console.log(this.user);
        this.fillForm();
      });
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

  fillForm() {
    this.form.reset({
      firstname: this.user.firstName,
      lastname: this.user.lastName,
      username: this.user.userName,
      email: this.user.emailAddress,
      active: this.user.active,
      language: this.user.defaultLanguage,
      groups: this.user.groups,
    });
  }

}
