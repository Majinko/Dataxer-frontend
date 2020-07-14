import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DemandComponent} from './demand.component';
import {DemandIndexComponent} from './demand-index/demand-index.component';
import {DemandRoutingModule} from "./demand-routing.module";
import { DemandTableComponent } from './demand-index/component/demand-table/demand-table.component';
import {MaterialModule} from "../../../theme/modules/material.module";
import { DemandCreateComponent } from './demand-create/demand-create.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {ThemeModule} from "../../../theme/theme.module";
import { DemandEditComponent } from './demand-edit/demand-edit.component';


@NgModule({
  declarations: [DemandComponent, DemandIndexComponent, DemandTableComponent, DemandCreateComponent, DemandEditComponent],
  imports: [
    CommonModule,
    DemandRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgSelectModule,
    ThemeModule
  ]
})
export class DemandModule {
}
