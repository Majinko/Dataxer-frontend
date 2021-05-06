import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./page/dashboard-zone/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'setting',
    loadChildren: () => import('./page/setting-zone/setting.module').then(m => m.SettingModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./page/non-auth-zone/page.module')
      .then(m => m.PageModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'time',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
