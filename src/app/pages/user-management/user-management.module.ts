import { NgModule } from '@angular/core';

import { UserManagementComponent } from './user-management.component';
import { SharedModule } from '../shared/shared.module';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    UserManagementComponent,
    UserProfileComponent,
    UsersListComponent,
    ChangePasswordComponent
  ],
  imports: [
    UserManagementRoutingModule,

    SharedModule
  ]
})
export class UserManagementModule {
}
