import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {AuthGuardService} from '../../core/guards/auth-guard.service';
import {UserResolver} from '../../core/resolver/user.resolver';
import {CompanyResolver} from '../../core/resolver/company.resolver';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    resolve: {user: UserResolver, company: CompanyResolver},
    children: [
      {
        path: 'task',
        data: {godButtonTitle: 'Nová úloha', gotButtonRouteLink: '/task/create'},
        loadChildren: () => import('./task/task.module').then(m => m.TaskModule),
      },
      {
        path: 'contact',
        data: {godButtonTitle: 'Nový kontakt', gotButtonRouteLink: '/contact/create'},
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
      },
      {
        path: 'project',
        data: {godButtonTitle: 'Nová zákazka', gotButtonRouteLink: '/project/create'},
        loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
      },
      {
        path: 'demand',
        data: {godButtonTitle: 'Nový dopyt', gotButtonRouteLink: '/demand/create'},
        loadChildren: () => import('./demand/demand.module').then(m => m.DemandModule),
      },
      {
        path: 'invoice',
        data: {godButtonTitle: 'Nová faktúra', gotButtonRouteLink: '/invoice/create'},
        loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule),
      },
      {
        path: 'cost',
        data: {godButtonTitle: 'Nový náklad', gotButtonRouteLink: '/cost/create'},
        loadChildren: () => import('./cost/cost.module').then(m => m.CostModule),
      },
      {
        path: 'price-offer',
        data: {godButtonTitle: 'Nová cenová ponuka', gotButtonRouteLink: '/price-offer/create'},
        loadChildren: () => import('./price-offer/price-offer.module').then(m => m.PriceOfferModule),
      },
      {
        path: 'time',
        data: {godButtonTitle: 'Zaznamenať čas', gotButtonRouteLink: '/time/create'},
        loadChildren: () => import('./time/time.module').then(m => m.TimeModule),
      },
      {
        path: 'item',
        data: {godButtonTitle: 'Nová položka', gotButtonRouteLink: '/item/create'},
        loadChildren: () => import('./item/item.module').then(m => m.ItemModule),
      },
      {
        path: 'pack',
        data: {godButtonTitle: 'Nová sada poloziek', gotButtonRouteLink: '/pack/create'},
        loadChildren: () => import('./pack/pack.module').then(m => m.PackModule),
      },
    ],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CompanyResolver, UserResolver]
})
export class DashboardRoutingModule {
}
