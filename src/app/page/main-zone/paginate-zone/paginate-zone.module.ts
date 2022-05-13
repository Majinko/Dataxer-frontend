import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginateFilterComponent} from './components/paginate-filter/paginate-filter.component';
import {RouterModule, Routes} from '@angular/router';
import {ContactTableComponent} from './contact-table/contact-table.component';
import {TranslateModule} from '@ngx-translate/core';
import {ProjectTableComponent} from './project-table/project-table.component';
import {MaterialModule} from '../../../theme/modules/material.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {reducer} from '../../../core/store/reducers/filterReducer';
import {TimeTableComponent} from './time-table/time-table.component';
import {CoreModule} from '../../../core/core.module';
import {CostTableComponent} from './cost-table/cost-table.component';
import {ThemeModule} from '../../../theme/theme.module';
import {AvatarModule} from 'ngx-avatar';
import {InvoiceTableComponent} from './invoice-table/invoice-table.component';
import {PriceOfferTableComponent} from './price-offer-table/price-offer-table.component';
import {PackTableComponent} from './pack-table/pack-table.component';
import {ItemTableComponent} from './item-table/item-table.component';
import {PaginateZoneComponent} from './paginate.component';
import {DemandTableComponent} from './demand-table/demand-table.component';

const routes: Routes = [
  {
    path: '',
    component: PaginateZoneComponent,
    children: [
      {
        path: 'contacts',
        component: ContactTableComponent,
        data: {
          menuItem: [],
          godButtonTitle: 'Nový kontakt',
          gotButtonRouteLink: '/contact/create',

          // for filtering
          modelName: 'contact',
          inputSearchBarValues: ['name', 'email'],
          inputSearchBarSelectValues: [],

          permissions: {
            only: 'Contact'
          }
        },
      },
      {
        path: 'demands',
        component: DemandTableComponent,
        data: {
          menuItem: [],
          godButtonTitle: 'Nový dopyt',
          gotButtonRouteLink: '/demand/create',

          // for filtering
          modelName: 'demand',
          inputSearchBarValues: ['number'],
          inputSearchBarSelectValues: ['project.id'],

          permissions: {
            only: 'Contact'
          }
        },
      },
      {
        path: 'projects',
        component: ProjectTableComponent,
        data: {
          menuItem: [],
          godButtonTitle: 'Nová zákazka',
          gotButtonRouteLink: '/project/create',

          // for filtering
          modelName: 'project',
          inputSearchBarValues: ['title', 'number', 'address', 'contact.name'],
          inputSearchBarSelectValues: ['contact.id'],

          permissions: {
            only: 'Project'
          }
        },
      },
      {
        path: 'costs',
        component: CostTableComponent,
        data: {
          menuItem: [],
          godButtonTitle: 'Nový náklad',
          gotButtonRouteLink: '/cost/create',

          // for filtering
          modelName: 'cost',
          inputSearchBarValues: ['title', 'contractor.name'],
          inputSearchBarSelectValues: ['contractor.id', 'company.id', 'category.id', 'project.id', 'state', 'date'],

          permissions: {
            only: 'Cost'
          }
        },
      },
      {
        path: 'time',
        component: TimeTableComponent,
        data: {
          menuItem: [],
          godButtonTitle: 'Zaznamenať čas',
          gotButtonRouteLink: '/time/create',

          // for filtering
          modelName: 'time',
          inputSearchBarValues: ['description'],
          inputSearchBarSelectValues: ['date', 'project.id', 'category.id', 'user.id'],

          permissions: {
            only: 'time'
          }
        },
      },
      {
        path: 'invoices',
        component: InvoiceTableComponent,
        data: {
          menuItem: [{title: 'Nová faktúra', link: '/invoice/create/INVOICE'}, {
            title: 'Nová zálohová faktúra',
            link: '/invoice/create/PROFORMA'
          }],
          godButtonTitle: 'Nová faktúra',
          gotButtonRouteLink: '/invoice/create',

          // for filtering
          modelName: 'invoice',
          inputSearchBarValues: ['title', 'contact.name'],
          inputSearchBarSelectValues: ['contact.id', 'company.id', 'project.id', 'state', 'documentType', 'date'],


          permissions: {
            only: 'invoice'
          },
        },
      },
      {
        path: 'priceOffers',
        component: PriceOfferTableComponent,
        data: {
          menuItem: [],
          godButtonTitle: 'Nová cenová ponuka',
          gotButtonRouteLink: '/price-offer/create',

          // for filtering
          modelName: 'priceOffer',
          inputSearchBarValues: ['title', 'contact.name'],
          inputSearchBarSelectValues: ['contact.id', 'company.id', 'project.id', 'date'],

          permissions: {
            only: 'priceOffer'
          }
        },
      },
      {
        path: 'time',
        component: ProjectTableComponent,
        data: {
          menuItem: [],
          godButtonTitle: 'Zaznamenať čas',
          gotButtonRouteLink: '/time/create',

          // for filtering
          modelName: 'time',
          inputSearchBarValues: ['description'],
          inputSearchBarSelectValues: ['contact.id', 'start', 'end'],

          permissions: {
            only: 'time'
          }
        },
      },
      {
        path: 'items',
        component: ItemTableComponent,
        data: {
          menuItem: [],
          godButtonTitle: 'Nová položka',
          gotButtonRouteLink: '/item/create',

          // for filtering
          modelName: 'item',
          inputSearchBarValues: ['title'],
          inputSearchBarSelectValues: [],

          permissions: {
            only: 'item'
          }
        },
      },
      {
        path: 'packs',
        component: PackTableComponent,
        data: {
          menuItem: [],
          godButtonTitle: 'Nová sada poloziek',
          gotButtonRouteLink: '/pack/create',

          // for filtering
          modelName: 'pack',
          inputSearchBarValues: ['title'],
          inputSearchBarSelectValues: [],

          permissions: {
            only: 'pack'
          }
        },
      }
    ]
  }
];

@NgModule({
  declarations: [
    PaginateZoneComponent,
    PaginateFilterComponent,
    ContactTableComponent,
    ProjectTableComponent,
    CostTableComponent,
    InvoiceTableComponent,
    TimeTableComponent,
    PriceOfferTableComponent,
    PackTableComponent,
    ItemTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    MaterialModule,
    NgSelectModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      filterStore: reducer,
    }),
    CoreModule,
    ThemeModule,
    AvatarModule,
  ]
})
export class PaginateZoneModule {
}
