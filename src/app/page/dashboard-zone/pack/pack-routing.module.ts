import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PackComponent} from "./pack.component";
import {PackCreateComponent} from "./pack-create/pack-create.component";
import {PackIndexComponent} from "./pack-index/pack-index.component";
import {PackEditComponent} from "./pack-edit/pack-edit.component";

const routes: Routes = [{
  path: '',
  component: PackComponent,
  children: [
    {
      path: '',
      component: PackIndexComponent
    },
    {
      path: 'create',
      component: PackCreateComponent
    },
    {
      path: 'edit/:pack_id',
      component: PackEditComponent
    }
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackRoutingModule {
}
