import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingComponent} from './setting.component';
import {MaterialModule} from '../../theme/modules/material.module';
import {SettingRoutingModule} from './setting-routing.module';
import {ThemeModule} from '../../theme/theme.module';
import {ProfileComponent} from './profile/profile.component';

@NgModule({
  declarations: [SettingComponent, ProfileComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SettingRoutingModule,
    ThemeModule,
  ]
})
export class SettingModule {
}
