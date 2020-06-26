import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryComponent} from './category.component';
import {CategoryRoutingModule} from './category-routing.module';
import {IndexComponent} from './index/index.component';
import {MaterialModule} from '../../../theme/modules/material.module';
import { CategoryCreateComponent } from './create/category-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  declarations: [CategoryComponent, IndexComponent, CategoryCreateComponent],
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
