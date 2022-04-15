import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverviewComponent} from './overview.component';
import {RouterModule, Routes} from '@angular/router';
import {OverviewUserTimeMonthlyComponent} from './overview-user-time-monthly/overview-user-time-monthly.component';
import {OverviewUserTimeYearlyComponent} from './overview-user-time-yearly/overview-user-time-yearly.component';
import {OverviewCostYearlyComponent} from './overview-cost-yearly/overview-cost-yearly.component';
import {ThemeModule} from '../../../../theme/theme.module';
import {MaterialModule} from '../../../../theme/modules/material.module';
import {AvatarModule} from 'ngx-avatar';
import {CoreModule} from '../../../../core/core.module';
import {OverviewCostTableRowComponent} from './overview-cost-yearly/components/overview-cost-table-row/overview-cost-table-row.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {OverviewChartsComponent} from './overview-charts/overview-charts.component';
import {OverviewChartComponent} from './overview-charts/components/overview-chart/overview-chart.component';
import {NgApexchartsModule} from 'ng-apexcharts';
import {OverviewProfitChartComponent} from './overview-charts/components/overview-profit-chart/overview-profit-chart.component';

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
      },
      {
        path: 'charts',
        component: OverviewChartsComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    OverviewComponent,
    OverviewUserTimeMonthlyComponent,
    OverviewUserTimeYearlyComponent,
    OverviewCostYearlyComponent,
    OverviewCostTableRowComponent,
    OverviewChartsComponent,
    OverviewChartComponent,
    OverviewProfitChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    MaterialModule,
    AvatarModule,
    CoreModule,
    NgSelectModule,
    FormsModule,
    NgApexchartsModule,
  ]
})
export class OverviewModule {
}
