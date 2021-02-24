import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TimeIndexComponent} from './time-index/time-index.component';
import {TimeComponent} from './time.component';
import {TimeCreateComponent} from './time-create/time-create.component';
import {TimeEditComponent} from './time-edit/time-edit.component';

const routes: Routes = [{
  path: '',
  component: TimeComponent,
  children: [
    {
      path: '',
      component: TimeIndexComponent
    },
    {
      path: 'create',
      component: TimeCreateComponent
    },
    {
      path: 'edit/:id',
      component: TimeEditComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeRoutingModule {
}
