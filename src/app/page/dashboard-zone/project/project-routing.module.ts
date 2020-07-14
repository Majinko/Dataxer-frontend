import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProjectComponent} from "./project.component";
import {ProjectIndexComponent} from "./project-index/project-index.component";
import {ProjectCreateComponent} from "./project-create/project-create.component";
import {ProjectEditComponent} from "./project-edit/project-edit.component";

const routes: Routes = [{
  path: '',
  component: ProjectComponent,
  children: [
    {
      path: '',
      component: ProjectIndexComponent
    },
    {
      path: 'create',
      component: ProjectCreateComponent
    },
    {
      path: 'edit/:project_id',
      component: ProjectEditComponent
    }
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {
}
