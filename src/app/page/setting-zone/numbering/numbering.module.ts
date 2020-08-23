import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NumberingComponent} from './numbering.component';
import {RouterModule, Routes} from "@angular/router";
import {NumberingIndexComponent} from './numbering-index/numbering-index.component';
import {NumberingTableComponent} from './numbering-index/component/numbering-table/numbering-table.component';
import {NumberingCreateComponent} from './numbering-create/numbering-create.component';
import {MaterialModule} from "../../../theme/modules/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import { NumberingEditComponent } from './numbering-edit/numbering-edit.component';

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
  declarations: [NumberingComponent, NumberingIndexComponent, NumberingTableComponent, NumberingCreateComponent, NumberingEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class NumberingModule {
}
