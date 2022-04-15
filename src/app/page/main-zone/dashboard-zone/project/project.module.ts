import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectComponent} from './project.component';
import {ProjectRoutingModule} from './project-routing.module';
import {MaterialModule} from '../../../../theme/modules/material.module';
import {ProjectCreateComponent} from './project-create/project-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {ThemeModule} from '../../../../theme/theme.module';
import {ProjectEditComponent} from './project-edit/project-edit.component';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [
    ProjectComponent,
    ProjectCreateComponent,
    ProjectEditComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgSelectModule,
    ThemeModule,
    FormsModule,
    TranslateModule,
  ]
})
export class ProjectModule {
}
