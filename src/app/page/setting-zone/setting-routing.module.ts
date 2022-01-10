import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingComponent} from './setting.component';
import {AuthGuardService} from '../../core/guards/auth-guard.service';
import {UserResolver} from '../../core/resolver/user.resolver';
import {AppUserProfileResolver} from '../../core/resolver/appUserProfile.resolver';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    canActivate: [AuthGuardService],
    resolve: {user: UserResolver, appProfile: AppUserProfileResolver},
    children: [
      {
        path: 'profile',
        data: {
          godButtonTitle: 'Nový profil', gotButtonRouteLink: '/setting/profile/create',
          permissions: {
            only: 'Settings'
          },
        },
        loadChildren: () => import('./profile/profile.module')
          .then(m => m.ProfileModule),
      },
      {
        path: 'company',
        data: {
          godButtonTitle: 'Nová spoločnosť', gotButtonRouteLink: '/setting/company/create',
          permissions: {
            only: 'Settings'
          },
        },
        loadChildren: () => import('./company/company.module')
          .then(m => m.CompanyModule),
      },
      {
        path: 'company-setting',
        data: {
          permissions: {
            only: 'Settings'
          },
        },
        loadChildren: () => import('./company-setting/company-setting.module').then(m => m.CompanySettingModule),
      },
      {
        path: 'user',
        data: {
          godButtonTitle: 'Nový používateľ', gotButtonRouteLink: '/setting/user/create',
          permissions: {
            only: 'Settings'
          },
        },
        loadChildren: () => import('./user/user.module')
          .then(m => m.UserModule),
      },
      {
        path: 'category',
        data: {
          godButtonTitle: 'Nová kategória', gotButtonRouteLink: '/setting/category/create',
          permissions: {
            only: 'Settings'
          },
        },
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
      },
      {
        path: 'user',
        data: {
          permissions: {
            only: 'Settings'
          },
        },
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
      },
      {
        path: 'numbering',
        data: {
          godButtonTitle: 'Pridaj číselník', gotButtonRouteLink: '/setting/numbering/create',
          permissions: {
            only: 'Settings'
          },
        },
        loadChildren: () => import('./numbering/numbering.module')
          .then(m => m.NumberingModule),
      },
      {
        path: 'bank-account',
        data: {
          godButtonTitle: 'Nový bankový účet', gotButtonRouteLink: '/setting/bank-account/create',
          permissions: {
            only: 'Settings'
          },
        },
        loadChildren: () => import('./bank-account/bank-account.module').then(m => m.BankAccountModule),
      },
      {
        path: 'role',
        data: {
          godButtonTitle: 'Nová rola', gotButtonRouteLink: '/setting/role/create',
          permissions: {
            only: 'Settings'
          },
        },
        loadChildren: () => import('./role/role.module').then(m => m.RoleModule)
      },
      {
        path: 'mail-template',
        data: {
          permissions: {
            only: 'Settings'
          },
        },
        loadChildren: () => import('./mail-template/mail-template.module').then(m => m.MailTemplateModule),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AppUserProfileResolver, UserResolver]
})
export class SettingRoutingModule {
}
