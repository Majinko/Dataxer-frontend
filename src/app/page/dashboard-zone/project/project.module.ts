import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectIndexComponent} from './project-index/project-index.component';
import {ProjectTableComponent} from './project-index/components/project-table/project-table.component';
import {ProjectComponent} from './project.component';
import {ProjectRoutingModule} from './project-routing.module';
import {MaterialModule} from '../../../theme/modules/material.module';
import {ProjectCreateComponent} from './project-create/project-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {ThemeModule} from '../../../theme/theme.module';
import {ProjectEditComponent} from './project-edit/project-edit.component';


@NgModule({
  declarations: [ProjectComponent, ProjectIndexComponent, ProjectTableComponent, ProjectCreateComponent, ProjectEditComponent],
  exports: [],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgSelectModule,
    ThemeModule,
    FormsModule
  ]
})
export class ProjectModule {
}
