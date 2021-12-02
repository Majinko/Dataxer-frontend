import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryComponent} from './category.component';
import {CategoryRoutingModule} from './category-routing.module';
import {MaterialModule} from '../../../theme/modules/material.module';
import {CategoryUpdateCreateComponent} from './category-update-create/category-update-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {ThemeModule} from '../../../theme/theme.module';
import {CategoryTreeByTypeComponent} from './category-tree-by-type/category-tree-by-type.component';
import {CategoryTreeComponent} from './category-tree-by-type/components/category-tree/category-tree.component';


@NgModule({
  declarations: [CategoryComponent, CategoryUpdateCreateComponent, CategoryTreeByTypeComponent, CategoryTreeComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgSelectModule,
    ThemeModule
  ]
})
export class CategoryModule {
}
