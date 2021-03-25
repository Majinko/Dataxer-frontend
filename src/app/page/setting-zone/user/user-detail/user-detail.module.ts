import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserInfoComponent} from './user-info/user-info.component';
import {UserDetailComponent} from './user-detail.component';
import {RouterModule, Routes} from '@angular/router';
import {ThemeModule} from '../../../../theme/theme.module';

const routes: Routes = [
  {
    path: '',
    component: UserDetailComponent,
    children: [
      {
        path: '',
        component: UserInfoComponent
      }
    ]
  }
];

@NgModule({
  declarations: [UserDetailComponent, UserInfoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule
  ]
})
export class UserDetailModule {
}
