import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NumberingComponent} from './numbering.component';
import {RouterModule, Routes} from '@angular/router';
import {NumberingIndexComponent} from './numbering-index/numbering-index.component';
import {NumberingCreateComponent} from './numbering-create/numbering-create.component';
import {MaterialModule} from '../../../theme/modules/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NumberingEditComponent} from './numbering-edit/numbering-edit.component';
<<<<<<< HEAD
=======
import {ThemeModule} from '../../../theme/theme.module';
import {NgSelectModule} from "@ng-select/ng-select";
>>>>>>> createProfile

const routes: Routes = [{
  path: '',
  component: NumberingComponent,
  children: [
    {
      path: '',
      component: NumberingIndexComponent
    },
    {
      path: 'create',
      component: NumberingCreateComponent
    },
    {
      path: 'edit/:numbering_id',
      component: NumberingEditComponent
    }
  ]

}];

@NgModule({
  declarations: [
    NumberingComponent,
    NumberingIndexComponent,
    NumberingCreateComponent,
    NumberingEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
<<<<<<< HEAD
    ReactiveFormsModule
=======
    ReactiveFormsModule,
    ThemeModule,
    NgSelectModule,
    FormsModule
>>>>>>> createProfile
  ]
})
export class NumberingModule {
}
