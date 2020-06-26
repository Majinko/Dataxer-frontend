import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemComponent} from './item.component';
import {IndexComponent} from './item-index/index.component';
import {ItemCreateComponent} from './item-create/item-create.component';
import {ItemEditComponent} from "./item-edit/item-edit.component";

const routes: Routes = [{
  path: '',
  component: ItemComponent,
  children: [
    {
      path: '',
      component: IndexComponent
    },
    {
      path: 'create',
      component: ItemCreateComponent
    },
    {
      path: 'edit/:item_id',
      component: ItemEditComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemRoutingModule { }
