import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimeComponent} from './time.component';
import {TimeRoutingModule} from './time-routing.module';
import {TimeCreateComponent} from './time-create/time-create.component';
import {TimeIndexComponent} from './time-index/time-index.component';
import {TimeTableComponent} from './time-index/time-table/time-table.component';
import {MaterialModule} from '../../../theme/modules/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ThemeModule} from '../../../theme/theme.module';

@NgModule({
  declarations: [TimeComponent, TimeCreateComponent, TimeIndexComponent, TimeTableComponent],
  imports: [
    CommonModule,
    TimeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ThemeModule
  ]
})
export class TimeModule {
}
