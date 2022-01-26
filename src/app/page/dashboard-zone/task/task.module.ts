import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskComponent} from './task.component';
import {TaskRoutingModule} from './task-routing.module';
import {MaterialModule} from '../../../theme/modules/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {ThemeModule} from '../../../theme/theme.module';
import {AvatarModule} from 'ngx-avatar';
import { TaskIndexComponent } from './task-index/task-index.component';
import { TaskTodoComponent } from './components/task-todo/task-todo.component';
import { TaskShowComponent } from './task-show/task-show.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskTodoCreateComponent } from './components/task-todo-create/task-todo-create.component';
import { TaskChipSelectComponent } from './components/task-chip-select/task-chip-select.component';


@NgModule({
  declarations: [TaskComponent, TaskIndexComponent, TaskTodoComponent, TaskShowComponent, TaskDetailComponent, TaskTodoCreateComponent, TaskChipSelectComponent],
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
