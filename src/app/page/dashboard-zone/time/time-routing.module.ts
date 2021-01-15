import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TimeIndexComponent} from './time-index/time-index.component';
import {TimeComponent} from './time.component';
import {TimeCreateComponent} from './time-create/time-create.component';

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
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeRoutingModule {
}
