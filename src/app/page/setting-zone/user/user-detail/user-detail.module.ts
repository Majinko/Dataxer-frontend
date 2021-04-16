import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserInfoComponent} from './user-info/user-info.component';
import {UserDetailComponent} from './user-detail.component';
import {RouterModule, Routes} from '@angular/router';
import {ThemeModule} from '../../../../theme/theme.module';
import {UserSalaryComponent} from './user-salary/user-salary.component';
import {UserTimeComponent} from './user-time/user-time.component';
import {MaterialModule} from '../../../../theme/modules/material.module';
import {CoreModule} from '../../../../core/core.module';
import {TranslateModule} from '@ngx-translate/core';
import {ChartComponent} from './user-info/components/chart/chart.component';
import {NgApexchartsModule} from 'ng-apexcharts';
import {UserSalaryDialogComponent} from './user-salary/components/user-salary-dialog/user-salary-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';

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
        path: 'salary',
        component: UserSalaryComponent
      },
      {
        path: 'time',
        component: UserTimeComponent
      },
    ]
  }
];

@NgModule({
  declarations: [
    UserDetailComponent,
    UserInfoComponent,
    UserSalaryComponent,
    UserTimeComponent,
    ChartComponent,
    UserSalaryDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    MaterialModule,
    CoreModule,
    TranslateModule,
    NgApexchartsModule,
    ReactiveFormsModule
  ],
  entryComponents: [UserSalaryDialogComponent]
})
export class UserDetailModule {
}
