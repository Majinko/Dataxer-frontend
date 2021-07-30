import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TaskComponent} from "./task.component";
import {TaskIndexComponent} from "./task-index/task-index.component";
import {TaskCreateComponent} from "./task-create/task-create.component";
import {TaskEditComponent} from "./task-edit/task-edit.component";
import {TaskShowComponent} from './task-show/task-show.component';

const routes: Routes = [{
  path: '',
  component: TaskComponent,
  children: [
    {
      path: '',
      component: TaskIndexComponent,
    },
    {
      path: 'create',
      component: TaskCreateComponent
    },
    {
      path: 'edit/:task_id',
      component: TaskEditComponent
    },
    {
      path: 'show/:task_id',
      component: TaskShowComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {
}
