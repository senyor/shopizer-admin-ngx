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
  errorMessage = '';
  stores = [];
  roles;

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
        this.groups = [...groups];
      });
    this.storeService.getListOfStores({})
      .subscribe(res => {
        this.stores = [...res.data];
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
      active: [false, [Validators.required]],
      defaultLanguage: ['', [Validators.required]],
      groups: ['', [Validators.required]],
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
    this.form.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      store: this.user.merchant,
      userName: '',
      emailAddress: this.user.emailAddress,
      active: this.user.active,
      defaultLanguage: this.user.defaultLanguage,
      groups: this.user.groups,
    });
    (this.roles.isSuperadmin || this.roles.isRetailerAdmin) ?
      this.form.controls['store'].enable() : this.form.controls['store'].disable();
    this.cdr.detectChanges();
  }

  save() {
    this.form.patchValue({ userName: this.form.value.emailAddress });
    this.userService.checkIfUserExist(this.form.value.userName)
      .subscribe(data => {
        if (this.user && this.user.id) {
          if (!data.exists || (data.exists && this.user.userName === this.form.value.userName)) {
            this.userService.updateUser(+this.user.id, this.form.value)
              .subscribe(res => {
                console.log(res);
                this.toastr.success(this.translate.instant('user.toastr.userUpdated'));
                this.router.navigate(['pages/user-management/users']);
              });
          } else {
            this.errorMessage = this.translate.instant('user.toastr.emailExists');
          }
        } else {
          if (!data.exists) {
            this.userService.createUser(this.form.value, this.form.value.store)
              .subscribe(res => {
                console.log(res);
                this.toastr.success(this.translate.instant('user.toastr.userCreated'));
                this.router.navigate(['pages/user-management/users']);
              });
          } else {
            this.errorMessage = this.translate.instant('user.toastr.emailExists');
          }
        }
      });
  }

  remove() {
    this.userService.deleteUser(this.user.id)
      .subscribe(res => {
        console.log(res);
        this.toastr.success(this.translate.instant('user.toastr.userRemoved'));
        this.router.navigate(['pages/user-management/users']);
      });
  }

  userHasRole(group) {
    if (!this.user || !this.user.groups) return false;
    return this.user.groups.find((g: any) => g.id === group.id);
  }

  addRole(group) {
    let newGroups = this.form.value.groups ? [...this.form.value.groups] : [];
    // check if element is exist in array
    const index = newGroups.findIndex(el => el.id === group.id);
    // if exist
    if (index === -1) {
      newGroups = [...newGroups, group]; // add
    } else {
      newGroups.splice(index, 1); // remove
    }
    this.form.patchValue({ 'groups': newGroups }); // rewrite form
  }

  chooseMerchant(merchant) {
    console.log(merchant);
  }

}
