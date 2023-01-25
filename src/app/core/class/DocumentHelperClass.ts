import {Injectable} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {Company} from '../models/company';
import {BankAccountService} from '../services/bank-account.service';
import {NumberingService} from '../services/numbering.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../services/message.service';
import {Project} from '../models/project';
import {ProjectService} from '../services/project.service';
import {DocumentBase} from '../models/documentBase';
import {Pack} from '../models/pack';

@Injectable()
export abstract class DocumentHelperClass {
  isLoad: boolean = false;
  projects: Project[] = [];
  formGroup: FormGroup;
  isEdit: boolean = false;
  documentType: string = 'INVOICE';
  oldPacks: Pack[] = [];

  protected constructor(
    protected bankAccountService: BankAccountService,
    protected numberingService: NumberingService,
    protected messageService: MessageService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected projectService: ProjectService,
  ) {
  }

  protected getProject() {
    this.projectService.all().subscribe((p) => {
      this.projects = p;
    });
  }

  // detect change form
  protected changeForm() {
    if (this.formGroup) {
      this.formGroup.get('company').valueChanges.subscribe((company) => {
        this.isLoad = false;

        this.pathDocumentData(company);

        if (!this.documentType.includes('COST')) {
          this.getDefaultBankAccount(company);

          if (this.isEdit === false) {
            this.prepareDocumentNumber(company);
          }
        }
      });

      if (this.formGroup.get('contact')) {
        this.formGroup.get('contact').valueChanges.subscribe((contact) => {
          this.formGroup.get('documentData').patchValue({
            contact
          }, {emitEvent: false});
        });
      }
    }

    if (this.formGroup.get('project') && this.documentType === 'COST') {
      this.formGroup.get('project').valueChanges.subscribe((project) => {
        const isInternal = project == null || project.id === null;
        this.formGroup.get('isInternal').patchValue(isInternal, {emitEvent: false});
        if (isInternal){
          this.formGroup.get('project').patchValue({id: null, title: 'Firemný náklad'}, {emitEvent: false});
        }
      });
    }
  }

  // get default bank account
  protected getDefaultBankAccount(company: Company) {
    if (company && company.id) {
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
  }

  // prepare company number
  protected prepareDocumentNumber(company: Company) {
    if (company && company.id) {
      this.numberingService.generateNextNumberByDocumentType(this.documentType, company.id).subscribe(r => {
        this.formGroup.patchValue({
          number: r,
          documentType: this.documentType,
          variableSymbol: r.toString().replace(/\D/g, ''),
          title: this.getTitle(r),
        }, {emitEvent: false});
      });
    }
  }

  // patch company data
  protected pathDocumentData(company: Company) {
    if (company && company.id) {
      this.formGroup.get('documentData').patchValue({
        firm: company
      }, {emitEvent: false});
    }
  }

  protected pathFromOldObject(document: DocumentBase) {
    this.isLoad = true;
    this.oldPacks = document.packs;

    setTimeout(() => {
      this.isLoad = false;

      this.formGroup.patchValue({
        subject: document.subject,
        company: document.company,
        contact: document.contact,
        project: document.project,
        discount: document.discount === null ? 0 : document.discount,
      }, {emitEvent: true});
    }, 500);
  }

  // get document title
  private getTitle(documentNumber: string): string {
    let title: string = '';

    switch (this.documentType) {
      case 'PROFORMA':
        title = 'Zálohová faktúra';
        break;
      case 'PRICE_OFFER':
        title = 'Cenová ponuka';
        break;
      case 'DEMAND':
        title = 'Dopyt';
        break;
      default:
        title = 'Faktúra';
    }

    return title + ' ' + documentNumber;
  }
}
