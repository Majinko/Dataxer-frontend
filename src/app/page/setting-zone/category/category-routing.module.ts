import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CategoryComponent} from './category.component';
import {CategoryIndexComponent} from './category-index/category-index.component';
import {CategoryUpdateCreateComponent} from './category-update-create/category-update-create.component';

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
      component: CategoryUpdateCreateComponent
    },
    {
      path: 'create',
      component: CategoryUpdateCreateComponent
    },
    {
      path: 'update/:category_id',
      component: CategoryUpdateCreateComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {
}
