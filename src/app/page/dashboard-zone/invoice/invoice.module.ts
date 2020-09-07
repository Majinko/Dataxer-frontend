import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import {RouterModule, Routes} from "@angular/router";
import {InvoiceCreateComponent} from "./invoice-create/invoice-create.component";
import {InvoiceIndexComponent} from "./invoice-index/invoice-index.component";
import {InvoiceEditComponent} from "./invoice-edit/invoice-edit.component";
import { InvoiceTableComponent } from './invoice-index/invoice-table/invoice-table.component';

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
      path: 'edit/:invoice_id',
      component: InvoiceEditComponent
    }
  ]
}];

@NgModule({
  declarations: [InvoiceComponent, InvoiceTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class InvoiceModule { }
