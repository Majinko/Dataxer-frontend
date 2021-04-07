import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingComponent} from './setting.component';
import {MaterialModule} from '../../theme/modules/material.module';
import {SettingRoutingModule} from './setting-routing.module';
import {ThemeModule} from '../../theme/theme.module';
import {NgxPermissionsModule} from 'ngx-permissions';

@NgModule({
  declarations: [SettingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SettingRoutingModule,
    ThemeModule,

    // Specify your library as an import
    NgxPermissionsModule.forRoot()
  ]
})
export class SettingModule {
}
