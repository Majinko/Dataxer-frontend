import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryComponent} from './category.component';
import {CategoryRoutingModule} from './category-routing.module';
import {CategoryIndexComponent} from './category-index/category-index.component';
import {MaterialModule} from '../../../theme/modules/material.module';
import { CategoryUpdateCreateComponent } from './category-update-create/category-update-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  declarations: [CategoryComponent, CategoryIndexComponent, CategoryUpdateCreateComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class CategoryModule {
}
