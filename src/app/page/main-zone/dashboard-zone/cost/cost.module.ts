import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CostComponent} from './cost.component';
import {RouterModule, Routes} from '@angular/router';
import {CostCreateComponent} from './cost-create/cost-create.component';
import {CostEditComponent} from './cost-edit/cost-edit.component';
import {MaterialModule} from '../../../../theme/modules/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ThemeModule} from '../../../../theme/theme.module';
import {CoreModule} from '../../../../core/core.module';
import {CostShowComponent} from './cost-show/cost-show.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {TranslateModule} from '@ngx-translate/core';
import {AvatarModule} from 'ngx-avatar';
import {CostCreateFromFileComponent} from './cost-create-from-file/cost-create-from-file.component';

const routes: Routes = [
  {
    path: '',
    component: CostComponent,
    children: [
      {
        path: 'create',
        component: CostCreateComponent
      },
      {
        path: 'createFromFile',
        component: CostCreateFromFileComponent
      },
      {
        path: 'create/:id',
        component: CostCreateComponent
      },
      {
        path: 'edit/:id',
        component: CostEditComponent
      },
      {
        path: 'show/:id',
        component: CostShowComponent
      }
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    ThemeModule,
    CoreModule,
    NgSelectModule,
    TranslateModule,
    AvatarModule,
  ],
  declarations: [
    CostComponent,
    CostCreateComponent,
    CostEditComponent,
    CostShowComponent,
    CostCreateFromFileComponent,
  ],
})
export class CostModule {
}
