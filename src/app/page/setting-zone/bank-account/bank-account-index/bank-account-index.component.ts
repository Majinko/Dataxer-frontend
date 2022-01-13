import {Component, OnInit} from '@angular/core';
import {BankAccountService} from '../../../../core/services/bank-account.service';
import {BankAccount} from '../../../../core/models/bank-account';
import {MatDialog} from '@angular/material/dialog';
import {BankAccountDialogComponent} from '../bank-account-dialog/bank-account-dialog.component';
import {CompanyService} from '../../../../core/services/company.service';
import {Company} from '../../../../core/models/company';

@Component({
  selector: 'app-bank-account-index',
  templateUrl: './bank-account-index.component.html',
  styleUrls: ['./bank-account-index.component.scss']
})
export class BankAccountIndexComponent implements OnInit {
  companies: Company[] = [];
  bankAccounts: BankAccount[] = [];
  filteredBankAccount: BankAccount[] = [];

  selectedCompanyId: number = null;

  displayedColumns: string[] = ['name', 'code', 'iban', 'currency', 'default', 'actions'];

  constructor(
    private bankAccountService: BankAccountService,
    private companyService: CompanyService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.bankAccountService.accountChanges.subscribe(() => this.getAccounts(this.selectedCompanyId));

    this.getCompanies();
  }

  private getCompanies() {
    this.companyService.all().subscribe((companies) => {
      this.companies = companies;

      this.getAccounts(this.companies[0].id);
      this.selectedCompanyId = this.companies[0].id;
    });
  }

  private getAccounts(id: number) {
    this.bankAccountService.getAll().subscribe(bankAccounts => {
      this.bankAccounts = bankAccounts;

      this.filteredBankAccount = this.bankAccounts.filter((bA) => bA.company.id === id);
    });
  }

  destroy(id: number) {
    this.bankAccountService.destroy(id).subscribe(() => {
      this.bankAccounts = this.bankAccounts.filter(bankAccount => bankAccount.id !== id);
    });
  }

  setDefaultBank(id: number) {
    this.bankAccountService.setDefaultBankAccount(id).subscribe(() => {
      this.bankAccounts.forEach(bankAccount => {
        bankAccount.isDefault = bankAccount.id === id;
      });
    });
  }

  edit(bankAccount: BankAccount) {
    this.dialog.open(BankAccountDialogComponent, {
      width: '100%',
      maxWidth: '500px',
      autoFocus: false,
      data: {
        bankAccount
      }
    });
  }

  getBankAccountsByFirm() {
    this.filteredBankAccount = this.bankAccounts.filter((ba) => ba.company.id === this.selectedCompanyId);
  }
}
