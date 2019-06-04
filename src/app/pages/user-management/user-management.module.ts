import { NgModule } from '@angular/core';
import { UserManagementComponent } from './user-management.component';
import { SharedModule } from '../shared/shared.module';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    UserManagementComponent,
    UserProfileComponent
  ],
  imports: [
    UserManagementRoutingModule,

    SharedModule
  ]
})
export class UserManagementModule { }
