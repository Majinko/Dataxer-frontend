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
import {CoreModule} from '../../../core/core.module';
import { TimeEditComponent } from './time-edit/time-edit.component';

@NgModule({
  declarations: [TimeComponent, TimeCreateComponent, TimeIndexComponent, TimeTableComponent, TimeEditComponent],
    imports: [
        CommonModule,
        TimeRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        ThemeModule,
        CoreModule
    ]
})
export class TimeModule {
}
