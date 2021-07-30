import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskIndexComponent} from './task-index/task-index.component';
import {TaskTableComponent} from './task-index/components/task-table/task-table.component';
import {TaskCreateComponent} from './task-create/task-create.component';
import {TaskEditComponent} from './task-edit/task-edit.component';
import {TaskComponent} from './task.component';
import {TaskRoutingModule} from './task-routing.module';
import {MaterialModule} from '../../../theme/modules/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import { TaskShowComponent } from './task-show/task-show.component';
import {ThemeModule} from '../../../theme/theme.module';
import {AvatarModule} from 'ngx-avatar';


@NgModule({
  declarations: [TaskComponent, TaskIndexComponent, TaskTableComponent, TaskCreateComponent, TaskEditComponent, TaskShowComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgSelectModule,
    ThemeModule,
    AvatarModule
  ]
})
export class TaskModule {
}
