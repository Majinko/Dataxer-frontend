import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectDetailComponent} from './project-detail.component';
import {RouterModule, Routes} from '@angular/router';
import {ProjectInfoComponent} from './project-info/project-info.component';
import {MaterialModule} from '../../../../../theme/modules/material.module';
import {ProjectEvaluationComponent} from './project-evaluation/project-evaluation.component';
import {ProjectCategoryEvaluationComponent} from './project-category-evaluation/project-category-evaluation.component';
import {ProjectChartComponent} from './components/project-chart/project-chart.component';
import {NgApexchartsModule} from 'ng-apexcharts';
import {ThemeModule} from '../../../../../theme/theme.module';
import {CoreModule} from '../../../../../core/core.module';
import {DocumentTableComponent} from './project-info/components/document-table/document-table.component';
import { ProjectUserEvaluationTableComponent } from './components/project-user-evaluation-table/project-user-evaluation-table.component';
import {AvatarModule} from 'ngx-avatar';
import { ProjectEvaluationExpansionPanelComponent } from './project-category-evaluation/components/project-evaluation-expansion-panel/project-evaluation-expansion-panel.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProjectTimeComponent } from './project-time/project-time.component';
import { ProjectBudgetComponent } from './project-budget/project-budget.component';
import {TranslateModule} from '@ngx-translate/core';
import {ProjectBudgetItemsComponent} from './project-budget/components/project-budget-items/project-budget-items.component';
import { ProjectBudgetSettingsComponent } from './project-budget/components/project-budget-settings/project-budget-settings.component';
import { ProjectBudgetRefaktComponent } from './project-budget-refakt/project-budget-refakt.component';
import { ProjectBudgetExpansionsPanelComponent } from './project-budget-refakt/components/project-budget-expansions-panel/project-budget-expansions-panel.component';
import { ProjectBudgetPackTableComponent } from './project-budget-refakt/components/project-budget-pack-table/project-budget-pack-table.component';
import { ProjectTimeFilterComponent } from './project-time/project-time-filter/project-time-filter.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectDetailComponent,
    children: [
      {
        path: '',
        component: ProjectInfoComponent
      },
      {
        path: 'evaluation',
        component: ProjectEvaluationComponent
      },
      {
        path: 'category-evaluation',
        component: ProjectCategoryEvaluationComponent
      },
      {
        path: 'time-evaluation',
        component: ProjectTimeComponent
      },
      {
        path: 'budget',
        component: ProjectBudgetRefaktComponent
      },
    ]
  }
];

@NgModule({
  declarations: [
    ProjectDetailComponent,
    ProjectInfoComponent,
    ProjectEvaluationComponent,
    ProjectCategoryEvaluationComponent,
    ProjectChartComponent,
    DocumentTableComponent,
    ProjectUserEvaluationTableComponent,
    ProjectEvaluationExpansionPanelComponent,
    ProjectTimeComponent,
    ProjectBudgetComponent,
    ProjectBudgetItemsComponent,
    ProjectBudgetSettingsComponent,
    ProjectBudgetRefaktComponent,
    ProjectBudgetExpansionsPanelComponent,
    ProjectBudgetPackTableComponent,
    ProjectTimeFilterComponent,
  ],
  imports: [
    NgApexchartsModule,
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ThemeModule,
    CoreModule,
    AvatarModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class ProjectDetailModule {
}
