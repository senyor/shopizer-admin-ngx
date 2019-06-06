import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfigService } from '../../shared/services/config.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'ngx-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnChanges {
  form: FormGroup;
  @Input() user: any;
  languages = [];
  groups = [];
  flag = true;

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private userService: UserService
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
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.user.currentValue) {
      if (this.user.id && this.user.id !== +this.userService.getUserId()) {
        this.flag = false;
      }
      this.fillForm();

    }
  }

  private createForm() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      emailAddress: ['', [Validators.required]],
      active: ['', [Validators.required]],
      defaultLanguage: ['', [Validators.required]],
      groups: ['', [Validators.required]],
    });
  }

  fillForm() {
    this.form.reset({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      userName: this.user.userName,
      emailAddress: this.user.emailAddress,
      active: this.user.active,
      defaultLanguage: this.user.defaultLanguage,
      groups: this.user.groups,
    });
  }

  save() {
    console.log(this.form.value);
  }

  remove() {
    console.log('remove');
  }

  userHasRole(group) {
    if (!this.user || !this.user.groups) return false;
    return this.user.groups.find((g) => g.id === group.id);
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

}
