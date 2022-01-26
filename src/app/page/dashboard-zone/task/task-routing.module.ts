import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TaskComponent} from './task.component';
import {TaskIndexComponent} from './task-index/task-index.component';
import {TaskShowComponent} from './task-show/task-show.component';
import {TaskDetailComponent} from './task-detail/task-detail.component';

const routes: Routes = [{
  path: '',
  component: TaskComponent,
  children: [
    {
      path: '',
      component: TaskIndexComponent,
    },
    {
      path: ':type',
      component: TaskIndexComponent,
    },
    {
      path: 'show/:id',
      component: TaskShowComponent,
    },
    {
      path: 'show/:id/:todo',
      component: TaskDetailComponent,
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {
}
