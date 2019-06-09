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
  pwdPattern = '^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{6,12}$';

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
      newPassword: ['', [Validators.required, Validators.pattern(this.pwdPattern)]],
      confirmNewPassword: ['', [Validators.required]],
    }, {validator: this.checkPasswords });
  }

  get password() {
    return this.form.get('password');
  }

  get newPassword() {
    return this.form.get('newPassword');
  }

  get confirmNewPassword() {
    return this.form.get('confirmNewPassword');
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.newPassword.value;
    const confirmPass = group.controls.confirmNewPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit() {
    console.log('result', this.form.value);
  }

}
