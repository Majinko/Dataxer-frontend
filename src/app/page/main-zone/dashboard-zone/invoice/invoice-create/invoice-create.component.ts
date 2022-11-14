import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../../../core/services/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentHelper} from '../../../../../core/class/DocumentHelper';
import {InvoiceService} from '../../../../../core/services/invoice.service';
import {UserService} from '../../../../../core/services/user.service';
import {addDays, APP_DATE_FORMATS} from '../../../../../../helper';
import {NumberingService} from '../../../../../core/services/numbering.service';
import {CompanyService} from '../../../../../core/services/company.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {BankAccountService} from '../../../../../core/services/bank-account.service';
import {DatePipe} from '@angular/common';
import {DocumentHelperClass} from '../../../../../core/class/DocumentHelperClass';
import {PriceOfferService} from '../../../../../core/services/priceOffer.service';
import {ProjectService} from '../../../../../core/services/project.service';
import {BudgetService} from '../../../../../core/services/budget.service';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    DocumentHelper,
    DatePipe
  ],
})
export class InvoiceCreateComponent extends DocumentHelperClass implements OnInit, OnDestroy {
  formGroup: FormGroup;
  submitted: boolean = false;
  moreOptions: boolean = false;
  documentType: string = 'INVOICE';
  projectId: number;

  constructor(
    protected numberingService: NumberingService,
    protected bankAccountService: BankAccountService,
    protected messageService: MessageService,
    protected router: Router,
    public route: ActivatedRoute,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private userService: UserService,
    public companyService: CompanyService,
    private invoiceService: InvoiceService,
    private budgetService: BudgetService,
    private priceOfferService: PriceOfferService,
    protected projectService: ProjectService,
    public documentHelper: DocumentHelper
  ) {
    super(bankAccountService, numberingService, messageService, router, route, projectService);
  }

  ngOnInit(): void {
    this.prepareForm();
    this.setInvoiceDataByType();
    this.getProject();

    this.route.params.subscribe(params => {
      this.prepareInvoiceData();
      this.changeForm();
      this.documentType = params.type;

      if (this.f.company.value) {
        this.prepareDocumentNumber(this.f.company.value);
      }

      if (params.projectId) {
        this.projectId = params.projectId;
        this.prepareInvoiceFromBudget(params.projectId, params.itemIds);
      }
    });
  }

  ngOnDestroy(): void {
    this.formGroup.reset();
  }

  // prepare form
  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      contact: [null, Validators.required],
      project: [null],
      documentType: null,
      state: 'UNPAID',
      title: ['', Validators.required],
      subject: null,
      company: [null, Validators.required],
      number: ['', Validators.required],
      variableSymbol: ['', Validators.required],
      constantSymbol: '0308',
      specificSymbol: '',
      paymentMethod: 'BANK_PAYMENT',
      deliveryMethod: 'MAIL',
      createdDate: [new Date(), Validators.required],
      deliveredDate: [new Date(), Validators.required],
      dueDate: [addDays(new Date(), 14)],
      note: null,
      headerComment: '',
      discount: 0,
      price: 0,
      totalPrice: 0,
      documentData: this.formBuilder.group({
        contact: null,
        bankAccount: null,
        firm: this.companyService.company,
        user: this.formBuilder.group({
          displayName: '',
          phone: '',
          email: '',
        }),
      }),

      packs: this.formBuilder.array([])
    });
  }

  // set type of invoice
  private setInvoiceDataByType() {
    this.documentType = this.route.snapshot.paramMap.get('type') === 'PROFORMA' ? this.route.snapshot.paramMap.get('type') : 'INVOICE';

    if (!window.location.href.includes('create-from-proforma')) {
      if (+this.route.snapshot.paramMap.get('id')) {
        if (this.route.snapshot.paramMap.get('type') === 'TAX_DOCUMENT') {
          this.invoiceService.taxInvoice(+this.route.snapshot.paramMap.get('id')).subscribe(invoice => {
            this.pathFromOldObject(invoice);
          });
        } else if (this.route.snapshot.paramMap.get('type') === 'SUMMARY_INVOICE') {
          // tslint:disable-next-line:max-line-length
          this.invoiceService.summaryInvoice(+this.route.snapshot.paramMap.get('id'), this.route.snapshot.paramMap.get('fromType')).subscribe(invoice => {
            this.pathFromOldObject(invoice);
          });
        } else {
          this.invoiceService.duplicate(+this.route.snapshot.paramMap.get('id')).subscribe(invoice => {
            this.pathFromOldObject(invoice);
          });
        }
      }
    } else {
      this.priceOfferService.getById(+this.route.snapshot.paramMap.get('id')).subscribe(proforma => {
        proforma.packs.forEach((pack) => {
          pack.id = null;

          pack.packItems.forEach((item) => {
            item.id = null;
          });
        });

        this.pathFromOldObject(proforma);
      });
    } // invoice is create from proforma
  }

  // set user
  private prepareInvoiceData() {
    this.formGroup.get('documentData.user').patchValue(this.userService.user);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  submit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      setTimeout(() => {
        this.documentHelper.scrollIfFormHasErrors(this.formGroup).then(() => {
          this.messageService.add('Prosíme o skontrolovanie povinných údajov');
        });
      }, 100);
      return;
    }

    // set invoice price and total price
    this.formGroup.patchValue({
      price: this.documentHelper.price,
      totalPrice: this.documentHelper.totalPrice,
    });

    this.isLoad = true;

    if (this.projectId) {
      this.invoiceService.storeFromBudget(this.formGroup.value, this.projectId).subscribe((r) => {
        this.isLoad = false;
        this.router
          .navigate(['/paginate/invoices'])
          .then(() => {
            this.messageService.add('Faktúra bola uložená');
          });
      });
    } else {
      this.invoiceService.store(this.formGroup.value, +this.route.snapshot.paramMap.get('id')).subscribe((r) => {
        this.isLoad = false;
        this.router
          .navigate(['/paginate/invoices'])
          .then(() => {
            this.messageService.add('Faktúra bola uložená');
          });
      });
    }
  }

  private prepareInvoiceFromBudget(projectId: string, itemIds: string) {
    this.budgetService.getBudgetData(projectId, itemIds).subscribe((data) => {
      this.formGroup.get('project').patchValue(data.project);
      this.formGroup.get('contact').patchValue(data.contact);
      // this.formGroup.get('packs').patchValue(data.packs);
      // this.formGroup.get('packs').patchValue(data.packs);
      this.oldPacks = data.packs;
    });
  }
}
