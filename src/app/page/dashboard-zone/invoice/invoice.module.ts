import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoiceComponent} from './invoice.component';
import {RouterModule, Routes} from '@angular/router';
import {InvoiceCreateComponent} from './invoice-create/invoice-create.component';
import {InvoiceIndexComponent} from './invoice-index/invoice-index.component';
import {InvoiceEditComponent} from './invoice-edit/invoice-edit.component';
import {InvoiceTableComponent} from './invoice-index/components/invoice-table/invoice-table.component';
import {MaterialModule} from '../../../theme/modules/material.module';
import {ThemeModule} from '../../../theme/theme.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';
import {InvoiceShowComponent} from './invoice-show/invoice-show.component';
import { InvoiceFilterComponent } from './invoice-index/components/invoice-filter/invoice-filter.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [{
  path: '',
  component: InvoiceComponent,
  children: [
    {
      path: '',
      component: InvoiceIndexComponent
    },
    {
      path: 'create/:type',
      component: InvoiceCreateComponent
    },
    {
      path: 'create/:type/:id',
      component: InvoiceCreateComponent
    },
    {
      path: 'create/:type/:id/:fromType',
      component: InvoiceCreateComponent
    },
    {
      path: 'create-from-proforma/:type/:id',
      component: InvoiceCreateComponent
    },
    {
      path: 'edit/:id',
      component: InvoiceEditComponent
    },
    {
      path: 'show/:id',
      component: InvoiceShowComponent
    }
  ]
}];

@NgModule({
  declarations: [InvoiceComponent, InvoiceIndexComponent, InvoiceTableComponent, InvoiceCreateComponent, InvoiceEditComponent, InvoiceShowComponent, InvoiceFilterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ThemeModule,
    ReactiveFormsModule,
    CoreModule,
    NgSelectModule,
    TranslateModule,
  ]
})
export class InvoiceModule {
}
