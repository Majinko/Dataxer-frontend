import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverviewComponent} from './overview.component';
import {RouterModule, Routes} from '@angular/router';
import {OverviewUserTimeMonthlyComponent} from './overview-user-time-monthly/overview-user-time-monthly.component';
import {OverviewUserTimeYearlyComponent} from './overview-user-time-yearly/overview-user-time-yearly.component';
import {OverviewCostYearlyComponent} from './overview-cost-yearly/overview-cost-yearly.component';
import {ThemeModule} from '../../../theme/theme.module';
import {MaterialModule} from '../../../theme/modules/material.module';
import {AvatarModule} from 'ngx-avatar';
import {CoreModule} from '../../../core/core.module';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
    children: [
      {
        path: '',
        component: OverviewUserTimeMonthlyComponent
      },
      {
        path: 'time-yearly',
        component: OverviewUserTimeYearlyComponent
      },
      {
        path: 'cost-yearly',
        component: OverviewCostYearlyComponent
      }
    ]
  }
];

@NgModule({
  declarations: [OverviewComponent, OverviewUserTimeMonthlyComponent, OverviewUserTimeYearlyComponent, OverviewCostYearlyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    MaterialModule,
    AvatarModule,
    CoreModule,
  ]
})
export class OverviewModule {
}
