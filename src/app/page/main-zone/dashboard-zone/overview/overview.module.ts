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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OverviewChartsComponent} from './overview-charts/overview-charts.component';
import {OverviewChartComponent} from './overview-charts/components/overview-chart/overview-chart.component';
import {NgApexchartsModule} from 'ng-apexcharts';
import {OverviewProfitChartComponent} from './overview-charts/components/overview-profit-chart/overview-profit-chart.component';
import { OverviewFirmsComponent } from './overview-firms/overview-firms.component';
import { OverviewTimeDailyComponent } from './overview-time-daily/overview-time-daily.component';
import { OverviewHoursPriceComponent } from './overview-hours-price/overview-hours-price.component';
import { OverviewHoursPriceFilterComponent } from './overview-hours-price/components/overview-hours-price-filter/overview-hours-price-filter.component';
import { OverviewReviewFinanceComponent } from './overview-review-finance/overview-review-finance.component';
import { OverviewReviewFinanceTableComponent } from './overview-review-finance/components/overview-review-finance-table/overview-review-finance-table.component';

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
      },
      {
        path: 'firms',
        component: OverviewFirmsComponent
      },
      {
        path: 'daily',
        component: OverviewTimeDailyComponent
      },
      {
        path: 'hours-price',
        component: OverviewHoursPriceComponent
      },
      {
        path: 'year-review-finance',
        component: OverviewReviewFinanceComponent
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
    OverviewProfitChartComponent,
    OverviewFirmsComponent,
    OverviewTimeDailyComponent,
    OverviewHoursPriceComponent,
    OverviewHoursPriceFilterComponent,
    OverviewReviewFinanceComponent,
    OverviewReviewFinanceTableComponent,
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
        ReactiveFormsModule,
    ]
})
export class OverviewModule {
}
