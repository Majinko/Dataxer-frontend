import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageComponent} from './page.component';
import {PageRoutingModule} from './page-routing.module';
import {LoginComponent} from './login/login.component';
import {MaterialModule} from '../../theme/modules/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import {ThemeModule} from '../../theme/theme.module';
import {NgSelectModule} from '@ng-select/ng-select';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [PageComponent, LoginComponent, RegisterComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    PageRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ThemeModule,
    NgSelectModule
  ]
})
export class PageModule {
}
