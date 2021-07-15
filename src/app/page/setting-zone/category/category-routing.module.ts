import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CategoryComponent} from './category.component';
import {CategoryIndexComponent} from './category-index/category-index.component';
import {CategoryCreateComponent} from './category-create/category-create.component';

const routes: Routes = [{
  path: '',
  component: CategoryComponent,
  children: [
    {
      path: '',
      component: CategoryIndexComponent
    },
    {
      path: 'create',
      component: CategoryCreateComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {
}
