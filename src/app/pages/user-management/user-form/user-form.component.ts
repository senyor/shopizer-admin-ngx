import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, UrlTree, UrlSegment, UrlSegmentGroup, PRIMARY_OUTLET} from '@angular/router';

import { ConfigService } from '../../shared/services/config.service';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { StoreService } from '../../store-management/services/store.service';
import { StorageService } from '../../shared/services/storage.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'ngx-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  form: FormGroup;

  private _user: User;

  @Input()
  set user(user: User) {
    this._user = user;
  }

  get user(): User { return this._user; }

  //@Input() user: User;
  languages = [];
  groups = [];
  showRemoveButton = true;
  pwdPattern = '^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{6,12}$';
  emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
  stores = [];
  tree: UrlTree;
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
  isEmailUnique = true;
  loader = false;

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private userService: UserService,
    private storeService: StoreService,
    private storageService: StorageService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    this.roles = JSON.parse(localStorage.getItem('roles'));
  }

  ngOnInit() {

    this.showRemoveButton = this._user && this._user.id !== +this.userService.getUserId();
    this.loader = true;
    this.createForm();
    //path analysis
    console.log(this.router.url);
    //this.tree = this.router.parseUrl(this.router.url);
    //const g: UrlSegmentGroup = this.tree.root.children[PRIMARY_OUTLET];
    //const s: UrlSegment[] = g.segments;
    //s.forEach(segment => {
    //  console.log(segment.path);
    //});
    this.storageService.getMerchant();
    const languages = this.configService.getMerchantListOfSupportedLanguages();
    //const languages$ = this.configService.getListOfSupportedLanguages();
    const groups$ = this.configService.getListOfGroups();
    const stores$ = this.storeService.getListOfMerchantStoreNames();
    forkJoin(groups$, stores$).subscribe(([groups, stores]) => {
      // fill languages
      this.languages = [...languages];
      // fill store
      this.stores = [...stores];
      const uStore = this.stores.find((store) => store.code === this.form.value.store);
      this.chooseMerchant(uStore);
      // fill groups
      groups.forEach((el) => {
        el.checked = false;
        el.disabled = false;
      });
      this.groups = [...groups];
      if (this._user) {
        const roleRetail = this._user.groups.find((el: any) => el.name === 'ADMIN_RETAIL');
        const roleStore = this._user.groups.find((el: any) => el.name === 'ADMIN_STORE');
        if (roleRetail) {
          this.checkRules(roleRetail['name']);
        } else if (roleStore) {
          this.checkRules(roleStore['name']);
        }
        this._user.groups.forEach((uGroup) => {
          this.groups.forEach((group) => {
            //console.log('Looking at group ' + group.name);
            if(group.name === 'SUPERADMIN') {
              group.disabled = true;
            }
            if (uGroup['name'] === group.name) {
              group.checked = true;
              group.disabled = false;
            }
          });
        });
        this.fillForm();
      }
      this.loader = false;
    });
  }

  private createForm() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      store: [''],
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
      firstName: this._user.firstName,
      lastName: this._user.lastName,
      store: this._user.merchant,
      userName: '',
      password: '',
      emailAddress: this._user.emailAddress,
      active: this._user.active,
      defaultLanguage: this._user.defaultLanguage,
      groups: [...this._user.groups],
    });
    (this.roles.isSuperadmin || this.roles.isRetailerAdmin) ?
      this.form.controls['store'].enable() : this.form.controls['store'].disable();
    this.cdr.detectChanges();
  }

  save() {
    if (this.form.value.store === '' && (this.roles.isSuperadmin || this.roles.isRetailerAdmin)) {
      this.toastr.error(this.translate.instant('USER_FORM.STORE_REQUIRED'));
      return;
    }
    if (!this.isEmailUnique) {
      this.toastr.error(this.translate.instant('USER_FORM.EMAIL_EXISTS'));
      return;
    }
    const newGroups = [];
    this.groups.forEach((el) => {
      if (el.checked) {
        newGroups.push({ id: el.id, name: el.name });
      }
    });
    this.form.patchValue({ groups: newGroups });
    this.form.patchValue({ userName: this.form.value.emailAddress });
    if (this.form.value.groups.length === 0) {
      this.toastr.warning(this.translate.instant('COMMON.ADDING_USER_GROUPS_ERROR'));
      return;
    }
    if (this._user && this._user.id) {
      this.userService.updateUser(+this._user.id, this.form.value)
        .subscribe(res => {
          this.toastr.success(this.translate.instant('USER_FORM.USER_UPDATED'));
        });
    } else {
      this.userService.createUser(this.form.value)
        .subscribe(res => {
          this.toastr.success(this.translate.instant('USER_FORM.USER_CREATED'));
          this.router.navigate(['pages/user-management/users']);
        });
    }
  }

  remove() {
    this.userService.deleteUser(this._user.id)
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
    const store = (this.form.value && this.form.value.store) || (this._user && this._user.merchant);
    if (email !== '') {
      this.userService.checkIfUserExist({ unique: email, merchant: store })
        .subscribe(res => {
          if (this._user && this._user.emailAddress === email) {
            this.isEmailUnique = true;
          } else {
            this.isEmailUnique = !res.exists;
          }
        });
    } else {
      this.isEmailUnique = true;
    }
  }

  checkRules(role) {
    console.log('Role name ' + role);
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
