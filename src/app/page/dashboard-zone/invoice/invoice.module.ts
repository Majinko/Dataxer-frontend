import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoiceComponent} from './invoice.component';
import {RouterModule, Routes} from '@angular/router';
import {InvoiceCreateComponent} from './invoice-create/invoice-create.component';
import {InvoiceIndexComponent} from './invoice-index/invoice-index.component';
import {InvoiceEditComponent} from './invoice-edit/invoice-edit.component';
import {InvoiceTableComponent} from './invoice-index/invoice-table/invoice-table.component';
import {MaterialModule} from '../../../theme/modules/material.module';
import {ThemeModule} from '../../../theme/theme.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';

const routes: Routes = [{
  path: '',
  component: InvoiceComponent,
  children: [
    {
      path: '',
      component: InvoiceIndexComponent
    },
    {
      path: 'create',
      component: InvoiceCreateComponent
    },
    {
      path: 'edit/:id',
      component: InvoiceEditComponent
    }
  ]
}];

@NgModule({
  declarations: [InvoiceComponent, InvoiceIndexComponent, InvoiceTableComponent, InvoiceCreateComponent, InvoiceEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ThemeModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class InvoiceModule {
}
