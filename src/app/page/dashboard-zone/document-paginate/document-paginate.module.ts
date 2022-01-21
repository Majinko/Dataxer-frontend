import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocumentPaginateComponent} from './document-paginate/document-paginate.component';
import {DocumentFilterComponent} from './document-paginate/components/document-filter.component';
import {ThemeModule} from '../../../theme/theme.module';
import {MaterialModule} from '../../../theme/modules/material.module';
import {CoreModule} from '../../../core/core.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DocumentPaginateComponent
  }
];


@NgModule({
  declarations: [
    DocumentPaginateComponent,
    DocumentFilterComponent
  ],
  exports: [
    DocumentFilterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CoreModule,
    ThemeModule,
    TranslateModule,
    NgSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DocumentPaginateModule {
}
