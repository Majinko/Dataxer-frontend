import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoComponent} from './todo.component';
import {RouterModule, Routes} from '@angular/router';
import {TodolistIndexComponent} from './todolist-index/todolist-index.component';
import {TodolistShowComponent} from './todolist-show/todolist-show.component';
import {TodoShowComponent} from './todo-show/todo-show.component';
import {TodoCreateComponent} from './components/todo-create/todo-create.component';
import {TodosBoxComponent} from './components/todos-box/todos-box.component';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {ReactiveFormsModule} from '@angular/forms';
import {AvatarModule} from 'ngx-avatar';
import {TodoPieChartComponent} from './components/todo-pie-chart/todo-pie-chart.component';
import {MaterialModule} from '../../../../theme/modules/material.module';
import {ThemeModule} from '../../../../theme/theme.module';
import {NgSelectModule} from '@ng-select/ng-select';
import { TodoProjectGuideComponent } from './todo-project-guide/todo-project-guide.component';
import { TodolistCreateComponent } from './components/todolist-create/todolist-create.component';
import {AutosizeModule} from "ngx-autosize";

const routes: Routes = [{
  path: '',
  component: TodoComponent,
  children: [
    {
      path: '',
      component: TodoProjectGuideComponent,
    },
    {
      path: 'todolist/:projectId',
      component: TodolistIndexComponent,
    },
    {
      path: 'todolist/:projectId/:type',
      component: TodolistIndexComponent,
    },
    {
      path: 'show/:id',
      component: TodolistShowComponent,
    },
    {
      path: 'show/:id/:todo',
      component: TodoShowComponent,
    },
  ]
}];


@NgModule({
  declarations: [TodoComponent, TodolistIndexComponent, TodolistShowComponent, TodoShowComponent,
    TodoCreateComponent, TodosBoxComponent, TodoPieChartComponent, TodoProjectGuideComponent, TodolistCreateComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        AngularEditorModule,
        ThemeModule,
        ReactiveFormsModule,
        AvatarModule,
        NgSelectModule,
        AutosizeModule
    ]
})
export class TodoModule {
}
