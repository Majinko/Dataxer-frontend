import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileIndexComponent } from './profile-index/profile-index.component';
import {ProfileComponent} from './profile.component';
import {RouterModule, Routes} from '@angular/router';
import {ThemeModule} from '../../../theme/theme.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../theme/modules/material.module';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';

const routes: Routes = [{
  path: '',
  component: ProfileComponent,
  children: [
    {
      path: '',
      component: ProfileIndexComponent
    }
  ]
}];

@NgModule({
  declarations: [
    ProfileIndexComponent,
    ProfileDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    NgSelectModule,
    ThemeModule
  ]
})
export class ProfileModule { }
