import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {AuthGuardService} from '../../core/guards/auth-guard.service';
import {UserResolver} from '../../core/resolver/user.resolver';
import {AppProfileResolver} from '../../core/resolver/appProfile.resolver';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    resolve: {user: UserResolver, appProfile: AppProfileResolver},
    children: [
      {
        path: 'paginate',
        loadChildren: () => import('../app-paginate-zone/paginate-zone.module').then(m => m.PaginateZoneModule)
      },
      {
        path: 'task',
        data: {
          godButtonTitle: 'Nový zoznam úloh',
          gotButtonRouteLink: '/task/create',
          permissions: {
            only: 'Task'
          }
        },
        loadChildren: () => import('./task/task.module').then(m => m.TaskModule),
      },
      {
        path: 'todo',
        data: {
          godButtonTitle: 'Nová úloha',
          gotButtonRouteLink: '/todo/create',
          permissions: {
            only: 'Task'
          }
        },
        loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule),
      },
      {
        path: 'contact',
        data: {
          menuItem: [],
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
        path: 'document/:documentType',
        loadChildren: () => import('./document-paginate/document-paginate.module').then(m => m.DocumentPaginateModule)
      },
      {
        path: 'invoice',
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
        data: {
          permissions: {
            only: 'Overview'
          }
        },
        loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule),
      },
      {
        path: '',
        redirectTo: 'time',
      }
    ],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AppProfileResolver, UserResolver]
})
export class DashboardRoutingModule {
}
