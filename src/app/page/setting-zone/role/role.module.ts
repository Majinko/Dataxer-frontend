import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleComponent} from './role.component';
import {RouterModule, Routes} from '@angular/router';
import {RoleIndexComponent} from './role-index/role-index.component';
import {MaterialModule} from '../../../theme/modules/material.module';
import {RoleDialogComponent} from './role-dialog/role-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';

const routes: Routes = [
  {
    path: '',
    component: RoleComponent,
    children: [
      {
        path: '',
        component: RoleIndexComponent
      },
    ]
  }
];

@NgModule({
  declarations: [RoleComponent, RoleIndexComponent, RoleDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  entryComponents: [RoleDialogComponent]
})
export class RoleModule {
}
