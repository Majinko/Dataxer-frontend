import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleComponent} from './role.component';
import {RouterModule, Routes} from '@angular/router';
import { RoleIndexComponent } from './role-index/role-index.component';
import {MaterialModule} from '../../../theme/modules/material.module';

const routes: Routes = [
  {
    path: '',
    component: RoleComponent,
    children: [
      {
        path: '',
        component: RoleIndexComponent
      }
    ]
  }
];

@NgModule({
  declarations: [RoleComponent, RoleIndexComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class RoleModule {
}
