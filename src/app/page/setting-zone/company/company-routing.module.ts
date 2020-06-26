import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyComponent} from './company.component';
import {CompanyIndexComponent} from './company-index/company-index.component';
import {CompanyCreateComponent} from './company-create/company-create.component';
import {CompanyEditComponent} from './company-edit/company-edit.component';

const routes: Routes = [{
  path: '',
  component: CompanyComponent,
  children: [
    {
      path: '',
      component: CompanyIndexComponent
    },
    {
      path: 'create',
      component: CompanyCreateComponent
    },
    {
      path: 'edit/:company_id',
      component: CompanyEditComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {
}
