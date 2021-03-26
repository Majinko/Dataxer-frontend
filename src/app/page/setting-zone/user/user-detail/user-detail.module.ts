import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserInfoComponent} from './user-info/user-info.component';
import {UserDetailComponent} from './user-detail.component';
import {RouterModule, Routes} from '@angular/router';
import {ThemeModule} from '../../../../theme/theme.module';
import {UserSalaryComponent} from './user-salary/user-salary.component';
import {UserTimeComponent} from './user-time/user-time.component';

const routes: Routes = [
  {
    path: '',
    component: UserDetailComponent,
    children: [
      {
        path: '',
        component: UserInfoComponent
      },
      {
        path: '/salary',
        component: UserSalaryComponent
      },
      {
        path: '/time',
        component: UserTimeComponent
      },
    ]
  }
];

@NgModule({
  declarations: [UserDetailComponent, UserInfoComponent, UserSalaryComponent, UserTimeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule
  ]
})
export class UserDetailModule {
}
