import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  user: {};
  path = 'User';

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.userService.getUser(this.userService.getUserId())
      .subscribe(user => {
        this.user = user;
      });
  }

  private createForm() {
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      repeatedNewPassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log('result', this.form.value);
  }

}
