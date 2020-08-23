import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingComponent} from './setting.component';
import {AuthGuardService} from '../../core/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'company',
        data: {godButtonTitle: 'Nová spoločnosť', gotButtonRouteLink: '/setting/company/create'},
        loadChildren: () => import('./company/company.module')
          .then(m => m.CompanyModule),
      },
      {
        path: 'category',
        data: {godButtonTitle: 'Nová kategória', gotButtonRouteLink: '/setting/category/create'},
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module')
          .then(m => m.UserModule),
      },
      {
        path: 'numbering',
        data: {godButtonTitle: 'Pridaj číselník', gotButtonRouteLink: '/setting/numbering/create'},
        loadChildren: () => import('./numbering/numbering.module')
          .then(m => m.NumberingModule),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {
}
