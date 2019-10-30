import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import { TokenService } from '../services/token.service';
import { UserService } from '../../shared/services/user.service';
import { delay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private userService: UserService,
    private translate: TranslateService
  ) {
    this.createForm();
  }

  ngOnInit() {
    document.getElementsByTagName('body')[0].className += ' nb-theme-corporate';
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.errorMessage = '';
    const formData = this.form.value;

    this.authService.login(formData.username, formData.password)
      .subscribe(res => {
        this.tokenService.saveToken(res.token);
        this.userService.saveUserId(res.id);
        this.userService.getUser(res.id)
          .subscribe(user => {
            this.userService.checkForAccess(user.groups);
            localStorage.setItem('roles', JSON.stringify(this.userService.roles));
            delay(1000);
            this.router.navigate([ 'pages' ]);
          });
      }, err => {
        this.errorMessage = this.translate.instant('LOGIN.INVALID_DATA');
      });
  }

  private createForm() {
    this.form = this.fb.group({
      username: [ '', [ Validators.required ] ],
      password: [ '', Validators.required ]
    });
  }

}
