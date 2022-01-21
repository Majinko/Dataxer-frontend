import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../../core/services/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentHelper} from '../../../../core/class/DocumentHelper';
import {InvoiceService} from '../../../../core/services/invoice.service';
import {UserService} from '../../../../core/services/user.service';
import {addDays, APP_DATE_FORMATS, containsObject} from '../../../../../helper';
import {NumberingService} from '../../../../core/services/numbering.service';
import {CompanyService} from '../../../../core/services/company.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {BankAccountService} from '../../../../core/services/bank-account.service';
import {DatePipe} from '@angular/common';
import {PriceOfferService} from '../../../../core/services/priceOffer.service';
import {Pack} from '../../../../core/models/pack';
import {DocumentHelperClass} from '../../../../core/class/DocumentHelperClass';

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
export class InvoiceCreateComponent extends DocumentHelperClass implements OnInit {
  formGroup: FormGroup;
  submitted: boolean = false;
  moreOptions: boolean = false;
  oldPacks: Pack[] = [];
  documentType: string = 'INVOICE';

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
    private priceOfferService: PriceOfferService,
    public documentHelper: DocumentHelper
  ) {
    super(bankAccountService, numberingService, messageService, router, route);
  }

  ngOnInit(): void {
    this.setInvoiceDataByType();
    this.prepareForm();
    this.prepareInvoiceData();
    this.changeForm();

    this.route.params.subscribe(params => {
      this.prepareInvoiceData();
      this.documentType = params.type;

      if (this.f.company.value) {
        this.prepareDocumentNumber(this.f.company.value);
      }
    });
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

  private pathFromOldObject(document: any) {
    this.oldPacks = document.packs;

    setTimeout(() => {
      this.formGroup.patchValue({
        company: document.company,
        contact: document.contact,
        project: document.project,
        discount: document.discount === null ? 0 : document.discount,
      });
    });
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
      return;
    }

    // set invoice price and total price
    this.formGroup.patchValue({
      price: this.documentHelper.price,
      totalPrice: this.documentHelper.totalPrice,
      packs: this.documentHelper.packs
    });

    this.invoiceService.store(this.formGroup.value, +this.route.snapshot.paramMap.get('id')).subscribe((r) => {
      this.router
        .navigate(['/document/invoice'])
        .then(() => {
          this.messageService.add('Faktúra bola uložená');
        });
    });
  }
}
