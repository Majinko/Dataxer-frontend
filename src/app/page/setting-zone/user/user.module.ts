import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {RouterModule, Routes} from '@angular/router';
import {UserEditComponent} from './user-edit/user-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../theme/modules/material.module';
import {AvatarModule} from 'ngx-avatar';
import {NgSelectModule} from '@ng-select/ng-select';
import {UserAllComponent} from './user-all/user-all.component';
import {UserCreateComponent} from './user-create/user-create.component';
import {CoreModule} from '../../../core/core.module';
import {ThemeModule} from '../../../theme/theme.module';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: UserEditComponent
      },
      {
        path: 'all',
        component: UserAllComponent
      },
      {
        path: 'create',
        component: UserCreateComponent
      },
      {
        path: 'edit/:uid',
        component: UserEditComponent
      },
      {
        path: 'show/:uid',
        loadChildren: () => import('./user-detail/user-detail.module').then((m) => m.UserDetailModule)
      }
    ]
  },
];

@NgModule({
  declarations: [UserComponent, UserEditComponent, UserAllComponent, UserCreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule,
    AvatarModule,
    NgSelectModule,
    CoreModule,
    ThemeModule
  ]
})
export class UserModule {
}
