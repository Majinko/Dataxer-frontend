import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BankAccountComponent} from './bank-account.component';
import {RouterModule, Routes} from "@angular/router";
import {BankAccountIndexComponent} from './bank-account-index/bank-account-index.component';
import {BankAccountDialogComponent} from './bank-account-dialog/bank-account-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../theme/modules/material.module';
import {ThemeModule} from '../../../theme/theme.module';
import {NgSelectModule} from "@ng-select/ng-select";

const routes: Routes = [{
  path: '',
  component: BankAccountComponent,
  children: [
    {
      path: '',
      component: BankAccountIndexComponent
    },
    {
      path: 'create',
      component: BankAccountDialogComponent
    }
  ]
}];

@NgModule({
  declarations: [BankAccountComponent, BankAccountIndexComponent, BankAccountDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule,
    ThemeModule,
    NgSelectModule,
    FormsModule
  ],
  entryComponents: [BankAccountDialogComponent]
})
export class BankAccountModule {
}
