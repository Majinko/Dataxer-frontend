import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectDetailComponent} from './project-detail.component';
import {RouterModule, Routes} from '@angular/router';
import {ProjectInfoComponent} from './project-info/project-info.component';
import {MaterialModule} from '../../../../theme/modules/material.module';
import {ProjectEvaluationComponent} from './project-evaluation/project-evaluation.component';
import {ProjectCategoryEvaluationComponent} from './project-category-evaluation/project-category-evaluation.component';
import {ProjectChartComponent} from './components/project-chart/project-chart.component';
import {NgApexchartsModule} from 'ng-apexcharts';
import {ThemeModule} from '../../../../theme/theme.module';

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
      }
    ]
  }
];

@NgModule({
  declarations: [
    ProjectDetailComponent,
    ProjectInfoComponent,
    ProjectEvaluationComponent,
    ProjectCategoryEvaluationComponent,
    ProjectChartComponent
  ],
  imports: [
    NgApexchartsModule,
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ThemeModule
  ]
})
export class ProjectDetailModule {
}
