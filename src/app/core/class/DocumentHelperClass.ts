import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Company} from '../models/company';
import {BankAccountService} from '../services/bank-account.service';
import {NumberingService} from '../services/numbering.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../services/message.service';

@Injectable()
export abstract class DocumentHelperClass {
  formGroup: FormGroup;
  isEdit: boolean = false;
  documentType: string = 'INVOICE';

  protected constructor(
    protected bankAccountService: BankAccountService,
    protected numberingService: NumberingService,
    protected messageService: MessageService,
    protected router: Router,
    protected route: ActivatedRoute,
  ) {
  }

  // detect change form
  protected changeForm() {
    if (this.formGroup) {
      this.formGroup.get('company').valueChanges.subscribe((company) => {
        this.pathDocumentData(company);

        if (this.isEdit === false) {
          this.prepareDocumentNumber(company);
          this.getDefaultBankAccount(company);
        }
      });

      this.formGroup.get('contact').valueChanges.subscribe((contact) => {
        this.formGroup.get('documentData').patchValue({
          contact
        }, {emitEvent: false});
      });
    }
  }

  // get default bank account
  protected getDefaultBankAccount(company: Company) {
    this.bankAccountService.getDefaultBankAccount(company.id).subscribe(bA => {
        this.formGroup.get('documentData').patchValue({
          bankAccount: bA
        }, {emitEvent: false});
      },
      error => {
        if (error) {
          this.router.navigate(['/setting/bank-account']).then(() => {
            this.messageService.add('Pri vytváraní faktúr je potrebné mať nastavený defaultny účet.');
          });
        }
      });
  }

  // prepare company number
  protected prepareDocumentNumber(company: Company) {
    this.numberingService.generateNextNumberByDocumentType(this.documentType, company.id).subscribe(r => {
      this.formGroup.patchValue({
        number: r,
        documentType: this.documentType,
        variableSymbol: r.toString().replace(/\D/g, ''),
        title: this.getTitle(r),
      }, {emitEvent: false});
    });
  }

  // patch company data
  protected pathDocumentData(company: Company) {
    this.formGroup.get('documentData').patchValue({
      firm: company
    }, {emitEvent: false});
  }

  private getTitle(documentNumber: string): string {
    let title: string = '';

    switch (this.documentType) {
      case 'PROFORMA':
        title = 'Zálohová faktúra';
        break;
      case 'PRICE_OFFER':
        title = 'Cenová ponuka';
        break;
      default:
        title = 'Faktúra';
    }

    return title + ' ' + documentNumber;
  }
}
