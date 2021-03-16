import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectDetailComponent} from './project-detail.component';
import {RouterModule, Routes} from '@angular/router';
import {ProjectInfoComponent} from './project-info/project-info.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectDetailComponent,
    children: [
      {
        path: '',
        component: ProjectInfoComponent
      }
    ]
  }
];

@NgModule({
  declarations: [ProjectDetailComponent, ProjectInfoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProjectDetailModule {
}
