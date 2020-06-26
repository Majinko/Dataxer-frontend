import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimeComponent} from './time.component';
import {IndexComponent} from './index/index.component';
import {TimeRoutingModule} from './time-routing.module';
import { TimeCreateComponent } from './time-create/time-create.component';

@NgModule({
  declarations: [TimeComponent, IndexComponent, TimeCreateComponent],
  imports: [
    CommonModule,
    TimeRoutingModule
  ]
})
export class TimeModule {
}
