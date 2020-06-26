import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactComponent} from './contact.component';
import {ContactIndexComponent} from './contact-index/contact-index.component';
import {ContactCreateComponent} from './contact-create/contact-create.component';
import {ContactEditComponent} from './contact-edit/contact-edit.component';

const routes: Routes = [{
  path: '',
  component: ContactComponent,
  children: [
    {
      path: '',
      component: ContactIndexComponent
    },
    {
      path: 'create',
      component: ContactCreateComponent
    },
    {
      path: 'edit/:contact_id',
      component: ContactEditComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule {
}
