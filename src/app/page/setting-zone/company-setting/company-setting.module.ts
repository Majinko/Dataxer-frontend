import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompanySettingComponent} from './company-setting.component';
import {RouterModule, Routes} from '@angular/router';
import {TimeSettingComponent} from './time-setting/time-setting.component';
import {ThemeModule} from '../../../theme/theme.module';
import {MaterialModule} from '../../../theme/modules/material.module';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [{
  path: '',
  component: CompanySettingComponent,
  children: [{
    path: 'time',
    component: TimeSettingComponent
  }]
}];

@NgModule({
  declarations: [
    CompanySettingComponent,
    TimeSettingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CompanySettingModule {
}
