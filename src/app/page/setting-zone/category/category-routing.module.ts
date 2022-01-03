import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CategoryComponent} from './category.component';
import {CategoryUpdateCreateComponent} from './category-update-create/category-update-create.component';
import {CategoryTreeByTypeComponent} from './category-tree-by-type/category-tree-by-type.component';

const routes: Routes = [{
  path: '',
  component: CategoryComponent,
  children: [
    {
      path: 'group/:category_group',
      component: CategoryTreeByTypeComponent
    },
    {
      path: 'create',
      component: CategoryUpdateCreateComponent
    },
    {
      path: 'create/:group',
      component: CategoryUpdateCreateComponent
    },
    {
      path: 'edit/:id',
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
