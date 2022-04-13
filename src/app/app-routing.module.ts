import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./page/main-zone/main-zone.module').then(m => m.MainZoneModule),
  },
  {
    path: 'setting',
    loadChildren: () => import('./page/setting-zone/setting.module').then(m => m.SettingModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./page/non-auth-zone/page.module').then(m => m.PageModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
