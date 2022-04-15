import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoComponent} from './todo.component';
import {RouterModule, Routes} from '@angular/router';
import { TodoIndexComponent } from './todo-index/todo-index.component';

const routes: Routes = [{
  path: '',
  component: TodoComponent,
  children: [
    {
      path: '',
      component: TodoIndexComponent
    }
  ]
}];


@NgModule({
  declarations: [TodoComponent, TodoIndexComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TodoModule {
}
