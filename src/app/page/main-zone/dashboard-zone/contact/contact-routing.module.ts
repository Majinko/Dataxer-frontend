import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactComponent} from './contact.component';
import {ContactCreateComponent} from './contact-create/contact-create.component';
import {ContactEditComponent} from './contact-edit/contact-edit.component';
import {ContactShowComponent} from './contact-show/contact-show.component';

const routes: Routes = [{
  path: '',
  component: ContactComponent,
  children: [
    {
      path: 'create',
      component: ContactCreateComponent
    },
    {
      path: 'edit/:contact_id',
      component: ContactEditComponent
    },
    {
      path: 'show/:id',
      component: ContactShowComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule {
}
