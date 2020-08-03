import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TaskComponent} from "./task.component";
import {TaskIndexComponent} from "./task-index/task-index.component";
import {TaskCreateComponent} from "./task-create/task-create.component";
import {TaskEditComponent} from "./task-edit/task-edit.component";

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
    }
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {
}
