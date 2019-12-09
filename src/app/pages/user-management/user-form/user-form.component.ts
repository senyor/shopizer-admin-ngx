import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ConfigService } from '../../shared/services/config.service';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { StoreService } from '../../store-management/services/store.service';

@Component({
  selector: 'ngx-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnChanges {
  form: FormGroup;
  @Input() user: User;
  languages = [];
  groups = [];
  showRemoveButton = true;
  pwdPattern = '^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{6,12}$';
  emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
  stores = [];
  // user's roles
  roles;
  // rules for user's group
  rules = {
    'ADMIN_RETAIL': {
      rules: [
        { key: 'ADMIN_STORE', checked: false, disabled: true },
        { key: 'ADMIN_RETAIL', checked: false, disabled: false }
      ]
    },
    'ADMIN_STORE': {
      rules: [
        { key: 'ADMIN_STORE', checked: false, disabled: false },
        { key: 'ADMIN_RETAIL', checked: false, disabled: true }
      ]
    }
  };
  isCodeUnique = true;

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private userService: UserService,
    private storeService: StoreService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    this.roles = JSON.parse(localStorage.getItem('roles'));
    this.createForm();
  }

  ngOnInit() {
    this.configService.getListOfSupportedLanguages()
      .subscribe(languages => {
        this.languages = [...languages];
      });
    this.configService.getListOfGroups()
      .subscribe(groups => {
        groups.forEach((el) => {
          el.checked = false;
          el.disabled = false;
        });
        this.groups = [...groups];
        if (this.user) {
          this.user.groups.forEach((uGroup) => {
            this.groups.forEach((group) => {
              if (uGroup['name'] === group.name) {
                group.checked = true;
                group.disabled = false;
              }
            });
          });
        } else {
          this.checkRules('ADMIN_RETAIL');
        }
      });
    this.storeService.getListOfStores({})
      .subscribe(res => {
        this.stores = [...res.data];
        const uStore = this.stores.find((store) => store.code === this.form.value.store);
        this.chooseMerchant(uStore);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.user.currentValue && changes.user.currentValue.id) {
      if (this.user.id && this.user.id !== +this.userService.getUserId()) {
        this.showRemoveButton = false;
      }
      this.fillForm();
    }
  }

  private createForm() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      store: ['DEFAULT'],
      userName: [''],
      emailAddress: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.pattern(this.pwdPattern)]],
      active: [false],
      defaultLanguage: ['', [Validators.required]],
      groups: [[]],
    });
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get emailAddress() {
    return this.form.get('emailAddress');
  }

  get password() {
    return this.form.get('password');
  }

  get defaultLanguage() {
    return this.form.get('defaultLanguage');
  }

  get userGroups() {
    return this.form.get('groups');
  }

  fillForm() {
    this.form.get('password').clearValidators();
    this.form.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      store: this.user.merchant,
      userName: '',
      password: '',
      emailAddress: this.user.emailAddress,
      active: this.user.active,
      defaultLanguage: this.user.defaultLanguage,
      groups: [...this.user.groups],
    });
    (this.roles.isSuperadmin || this.roles.isRetailerAdmin) ?
      this.form.controls['store'].enable() : this.form.controls['store'].disable();
    this.cdr.detectChanges();
  }

  save() {
    const newGroups = [];
    this.groups.forEach((el) => {
      if (el.checked) {
        newGroups.push({ id: el.id, name: el.name });
      }
    });
    this.form.patchValue({ groups: newGroups });
    this.form.patchValue({ userName: this.form.value.emailAddress });
    if (this.form.value.groups.length === 0) {
      this.toastr.warning( this.translate.instant('COMMON.ADDING_USER_GROUPS_ERROR'));
      return;
    }
    this.userService.checkIfUserExist({ unique: this.form.value.userName, merchant: this.form.value.store})
      .subscribe(data => {
        if (this.user && this.user.id) {
          if (!data.exists || (data.exists && this.user.userName === this.form.value.userName)) {
            this.userService.updateUser(+this.user.id, this.form.value)
              .subscribe(res => {
                this.toastr.success(this.translate.instant('USER_FORM.USER_UPDATED'));
              });
          } else {
            this.isCodeUnique = false;
          }
        } else {
          if (!data.exists) {
            this.userService.createUser(this.form.value)
              .subscribe(res => {
                this.toastr.success(this.translate.instant('USER_FORM.USER_CREATED'));
                this.router.navigate(['pages/user-management/users']);
              });
          } else {
            this.isCodeUnique = false;
          }
        }
      });
  }

  remove() {
    this.userService.deleteUser(this.user.id)
      .subscribe(res => {
        this.toastr.success(this.translate.instant('USER_FORM.USER_REMOVED'));
        this.router.navigate(['pages/user-management/users']);
      });
  }

  chooseMerchant(merchant) {
    const role = (merchant && merchant.retailer) ? 'ADMIN_RETAIL' : 'ADMIN_STORE';
    this.checkRules(role);
  }

  checkEmail(event) {
    const email = event.target.value;
    const store = (this.form.value && this.form.value.store) || (this.user && this.user.merchant);
    if (email !== '') {
      this.userService.checkIfUserExist({ unique: email, merchant: store })
        .subscribe(res => {
          if (this.user && this.user.emailAddress === email) {
            this.isCodeUnique = true;
          } else {
            this.isCodeUnique = !res.exists;
          }
        });
    } else {
      this.isCodeUnique = true;
    }
  }

  checkRules(role) {
    if (this.rules[role].rules.length !== 0) {
      this.rules[role].rules.forEach((el) => {
        this.groups.forEach((group) => {
          if (el.key === group.name) {
            group.checked = el.checked;
            group.disabled = el.disabled;
          }
        });
      });
    }
  }

}
