import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimeComponent} from './time.component';
import {TimeRoutingModule} from './time-routing.module';
import {TimeCreateComponent} from './time-create/time-create.component';
import {MaterialModule} from '../../../theme/modules/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ThemeModule} from '../../../theme/theme.module';
import {CoreModule} from '../../../core/core.module';
import {TimeEditComponent} from './time-edit/time-edit.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  declarations: [TimeComponent, TimeCreateComponent, TimeEditComponent],
  imports: [
    CommonModule,
    TimeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ThemeModule,
    CoreModule,
    FormsModule,
    TranslateModule,
    NgSelectModule
  ]
})
export class TimeModule {
}
