import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CostComponent} from './cost.component';
import {RouterModule, Routes} from '@angular/router';
import {CostIndexComponent} from './cost-index/cost-index.component';
import {CostCreateComponent} from "./cost-create/cost-create.component";
import {CostEditComponent} from "./cost-edit/cost-edit.component";
import {MaterialModule} from "../../../theme/modules/material.module";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: CostComponent,
    children: [
      {
        path: '',
        component: CostIndexComponent,
      },
      {
        path: 'create',
        component: CostCreateComponent
      },
      {
        path: 'edit/:id',
        component: CostEditComponent
      }
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    CostComponent,
    CostIndexComponent,
    CostCreateComponent,
    CostEditComponent
  ],
})
export class CostModule {
}
