import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreateNewUserComponent } from './create-new-user/create-new-user.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { UserDetailsComponent } from './user-details/user-details.component';

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
        canActivate: [AdminGuard],
        component: CreateNewUserComponent,
      },
      {
        path: 'users',
        canActivate: [AdminGuard],
        component: UsersListComponent,
      },
      {
        path: 'user-details/:id',
        canActivate: [AdminGuard],
        component: UserDetailsComponent,
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
