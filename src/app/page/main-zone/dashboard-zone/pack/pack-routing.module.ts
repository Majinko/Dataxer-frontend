import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PackComponent} from './pack.component';
import {PackCreateComponent} from './pack-create/pack-create.component';
import {PackEditComponent} from './pack-edit/pack-edit.component';
import {PackShowComponent} from './pack-show/pack-show.component';

const routes: Routes = [{
  path: '',
  component: PackComponent,
  children: [
    {
      path: 'create',
      component: PackCreateComponent
    },
    {
      path: 'edit/:pack_id',
      component: PackEditComponent
    },
    {
      path: 'show/:pack_id',
      component: PackShowComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackRoutingModule {
}
