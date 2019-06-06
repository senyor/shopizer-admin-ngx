import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreateNewUserComponent } from './create-new-user/create-new-user.component';

const routes: Routes = [
  {
    path: '', component: UserManagementComponent, children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: UserProfileComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'create-user',
        component: CreateNewUserComponent,
      },
      {
        path: 'users',
        component: UsersListComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {
}
