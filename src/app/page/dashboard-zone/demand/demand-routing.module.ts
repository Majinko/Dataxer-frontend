import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DemandComponent} from './demand.component';
import {DemandIndexComponent} from './demand-index/demand-index.component';
import {DemandCreateComponent} from './demand-create/demand-create.component';
import {DemandEditComponent} from './demand-edit/demand-edit.component';
import {DemandShowComponent} from './demand-show/demand-show.component';

const routes: Routes = [{
  path: '',
  component: DemandComponent,
  children: [
    {
      path: '',
      component: DemandIndexComponent
    },
    {
      path: 'create',
      component: DemandCreateComponent
    },
    {
      path: 'edit/:demand_id',
      component: DemandEditComponent
    },
    {
      path: 'show/:id',
      component: DemandShowComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandRoutingModule {
}
