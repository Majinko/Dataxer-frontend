import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {ThemeModule} from '../../theme/theme.module';
import {MaterialModule} from '../../theme/modules/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPermissionsModule} from 'ngx-permissions';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ThemeModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,

    // Specify your library as an import
    NgxPermissionsModule.forRoot()
  ]
})
export class DashboardModule {
}
