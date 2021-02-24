import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingComponent} from './setting.component';
import {AuthGuardService} from '../../core/guards/auth-guard.service';
import {UserResolver} from '../../core/resolver/user.resolver';
import {CompanyResolver} from '../../core/resolver/company.resolver';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    canActivate: [AuthGuardService],
    resolve: {user: UserResolver, company: CompanyResolver},
    children: [
      {
        path: 'company',
        data: {godButtonTitle: 'Nová spoločnosť', gotButtonRouteLink: '/setting/company/create'},
        loadChildren: () => import('./company/company.module')
          .then(m => m.CompanyModule),
      },
      {
        path: 'user',
        data: {godButtonTitle: 'Nový používateľ', gotButtonRouteLink: '/setting/user/create'},
        loadChildren: () => import('./user/user.module')
          .then(m => m.UserModule),
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
      {
        path: 'bank-account',
        data: {godButtonTitle: 'Nový bankový účet', gotButtonRouteLink: '/setting/bank-account/create'},
        loadChildren: () => import('./bank-account/bank-account.module')
          .then(m => m.BankAccountModule),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CompanyResolver, UserResolver]
})
export class SettingRoutingModule {
}
