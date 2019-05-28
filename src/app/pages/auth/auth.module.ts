import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ThemeModule } from "../../@theme/theme.module";
import { DashboardModule } from "../dashboard/dashboard.module";
import { ECommerceModule } from "../e-commerce/e-commerce.module";
import { MiscellaneousModule } from "../miscellaneous/miscellaneous.module";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule
  ]
})
export class AuthModule { }
