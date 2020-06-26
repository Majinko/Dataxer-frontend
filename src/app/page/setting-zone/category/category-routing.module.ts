import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CategoryComponent} from './category.component';
import {IndexComponent} from './index/index.component';
import {CategoryCreateComponent} from './create/category-create.component';

const routes: Routes = [{
  path: '',
  component: CategoryComponent,
  children: [
    {
      path: '',
      component: IndexComponent
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
