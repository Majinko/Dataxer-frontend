import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {AuthGuardService} from '../../core/guards/auth-guard.service';
import {UserResolver} from '../../core/resolver/user.resolver';
import {CompanyResolver} from '../../core/resolver/company.resolver';
import {NgxPermissionsGuard} from 'ngx-permissions';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    resolve: {user: UserResolver, company: CompanyResolver},
    children: [
      {
        path: 'task',
        canActivate: [NgxPermissionsGuard],
        data: {
          godButtonTitle: 'Nová úloha',
          gotButtonRouteLink: '/task/create',
          permissions: {
            only: 'Task'
          }
        },
        loadChildren: () => import('./task/task.module').then(m => m.TaskModule),
      },
      {
        path: 'contact',
        canActivate: [NgxPermissionsGuard],
        data: {
          godButtonTitle: 'Nový kontakt',
          gotButtonRouteLink: '/contact/create',
          permissions: {
            only: 'Contact'
          }
        },
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
      },
      {
        path: 'project',
        canActivate: [NgxPermissionsGuard],
        data: {
          godButtonTitle: 'Nová zákazka',
          gotButtonRouteLink: '/project/create',
          permissions: {
            only: 'Project'
          }
        },
        loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
      },
      {
        path: 'demand',
        canActivate: [NgxPermissionsGuard],
        data: {
          godButtonTitle: 'Nový dopyt',
          gotButtonRouteLink: '/demand/create',
          permissions: {
            only: 'Demand'
          }
        },
        loadChildren: () => import('./demand/demand.module').then(m => m.DemandModule),
      },
      {
        path: 'invoice',
        canActivate: [NgxPermissionsGuard],
        data: {
          godButtonTitle: 'Nová faktúra',
          gotButtonRouteLink: '/invoice/create',
          permissions: {
            only: 'Document'
          },
          menuItem: [{title: 'Nová faktúra', link: '/invoice/create/INVOICE'}, {
            title: 'Nová zálohová faktúra',
            link: '/invoice/create/PROFORMA'
          }]
        },
        loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule),
      },
      {
        path: 'cost',
        canActivate: [NgxPermissionsGuard],
        data: {
          godButtonTitle: 'Nový náklad', gotButtonRouteLink: '/cost/create',
          permissions: {
            only: 'Cost'
          },
        },
        loadChildren: () => import('./cost/cost.module').then(m => m.CostModule),
      },
      {
        path: 'price-offer',
        canActivate: [NgxPermissionsGuard],
        data: {
          godButtonTitle: 'Nová cenová ponuka',
          gotButtonRouteLink: '/price-offer/create',
          permissions: {
            only: 'Document'
          },
        },
        loadChildren: () => import('./price-offer/price-offer.module').then(m => m.PriceOfferModule),
      },
      {
        path: 'time',
        canActivate: [NgxPermissionsGuard],
        data: {
          godButtonTitle: 'Zaznamenať čas',
          gotButtonRouteLink: '/time/create',
          permissions: {
            only: 'Time'
          }
        },
        loadChildren: () => import('./time/time.module').then(m => m.TimeModule),
      },
      {
        path: 'item',
        canActivate: [NgxPermissionsGuard],
        data: {
          godButtonTitle: 'Nová položka',
          gotButtonRouteLink: '/item/create',
          permissions: {
            only: 'Item'
          }
        },
        loadChildren: () => import('./item/item.module').then(m => m.ItemModule),
      },
      {
        path: 'pack',
        canActivate: [NgxPermissionsGuard],
        data: {
          godButtonTitle: 'Nová sada poloziek',
          gotButtonRouteLink: '/pack/create',
          permissions: {
            only: 'Pack'
          }
        },
        loadChildren: () => import('./pack/pack.module').then(m => m.PackModule),
      },
      {
        path: 'overview',
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'Overview'
          }
        },
        loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule),
      }
    ],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CompanyResolver, UserResolver]
})
export class DashboardRoutingModule {
}
