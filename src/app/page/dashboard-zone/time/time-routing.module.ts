import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TimeComponent} from './time.component';
import {IndexComponent} from './index/index.component';

const routes: Routes = [{
  path: '',
  component: TimeComponent,
  children: [
    {
      path: '',
      component: IndexComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeRoutingModule {
}
