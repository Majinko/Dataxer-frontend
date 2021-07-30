import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../../core/services/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentHelper} from '../../../../core/class/DocumentHelper';
import {InvoiceService} from '../../../../core/services/invoice.service';
import {UserService} from '../../../../core/services/user.service';
import {addDays, APP_DATE_FORMATS} from '../../../../../helper';
import {NumberingService} from '../../../../core/services/numbering.service';
import {CompanyService} from '../../../../core/services/company.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {BankAccountService} from '../../../../core/services/bank-account.service';
import {DatePipe} from '@angular/common';
import {PriceOfferService} from '../../../../core/services/priceOffer.service';
import {Pack} from '../../../../core/models/pack';

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
export class InvoiceCreateComponent implements OnInit {
  formGroup: FormGroup;
  submitted: boolean = false;
  moreOptions: boolean = false;
  oldPacks: Pack[] = [];
  invoiceType: string = 'INVOICE';

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private userService: UserService,
    public companyService: CompanyService,
    private messageService: MessageService,
    private router: Router,
    public route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private priceOfferService: PriceOfferService,
    private numberingService: NumberingService,
    private bankAccountService: BankAccountService,
    public documentHelper: DocumentHelper
  ) {
  }

  ngOnInit(): void {
    this.setInvoiceDataByType();
    this.prepareForm();
    this.prepareInvoiceData();
    this.changeForm();
    this.getDefaultBankAccount();

    this.route.params.subscribe(params => {
      this.prepareInvoiceData();
    });
  }


  // prepare form
  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      contact: [null, Validators.required],
      project: [null, Validators.required],
      documentType: null,
      title: ['', Validators.required],
      subject: '',
      number: ['', Validators.required],
      variableSymbol: ['', Validators.required],
      constantSymbol: '0308',
      specificSymbol: '',
      state: 'WAITING',
      paymentMethod: 'BANK_PAYMENT',
      deliveryMethod: 'MAIL',
      createdDate: [new Date(), Validators.required],
      deliveredDate: [new Date(), Validators.required],
      dueDate: [addDays(new Date(), 14)],
      note: '',
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
    this.invoiceType = this.route.snapshot.paramMap.get('type') === 'PROFORMA' ? this.route.snapshot.paramMap.get('type') : 'INVOICE';


    if (!window.location.href.includes('create-from-proforma')) {
      if (+this.route.snapshot.paramMap.get('id')) {
        if (this.route.snapshot.paramMap.get('type') === 'TAX_DOCUMENT') {
          this.invoiceService.taxInvoice(+this.route.snapshot.paramMap.get('id')).subscribe(invoice => {
            this.pathFromOldObject(invoice);
          });
        } else if (this.route.snapshot.paramMap.get('type') === 'SUMMARY_INVOICE') {
          this.invoiceService.summaryInvoice(+this.route.snapshot.paramMap.get('id')).subscribe(invoice => {
            this.pathFromOldObject(invoice);
          });
        } else {
          this.invoiceService.getById(+this.route.snapshot.paramMap.get('id')).subscribe(invoice => {
            this.pathFromOldObject(invoice);
          });
        }
      }
    } else {
      this.priceOfferService.getById(+this.route.snapshot.paramMap.get('id')).subscribe(proforma => {
        this.pathFromOldObject(proforma);
      });
    } // invoice is create from proforma
  }

  private pathFromOldObject(document: any) {
    this.oldPacks = document.packs;

    this.formGroup.patchValue({
      contact: document.contact,
      project: document.project,
      discount: document.discount === null ? 0 : document.discount,
    });
  }

  // set user
  private prepareInvoiceData() {
    this.formGroup.get('documentData.user').patchValue(this.userService.user);

    this.numberingService.generateNextNumberByDocumentType(this.invoiceType).subscribe(r => {
      this.formGroup.patchValue({
        number: r,
        documentType: this.route.snapshot.paramMap.get('type'),
        variableSymbol: r.toString().replace(/\D/g, ''),
        title: (this.invoiceType === 'PROFORMA' ? 'Zálohová faktúra ' : 'Faktúra ') + r,
      });
    });
  }

  // detect change form
  private changeForm() {
    this.formGroup.valueChanges.subscribe(v => {
      this.formGroup.get('documentData').patchValue({
        contact: v.contact
      }, {emitEvent: false});
    });
  }

  // get default bank account
  private getDefaultBankAccount() {
    this.bankAccountService.getDefaultBankAccount().subscribe(bA => {
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

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  submit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    // set offer price and total price
    this.formGroup.patchValue({
      price: this.documentHelper.price,
      totalPrice: this.documentHelper.totalPrice,
      packs: this.documentHelper.packs
    });

    this.invoiceService.store(this.formGroup.value, +this.route.snapshot.paramMap.get('id')).subscribe((r) => {
      this.router
        .navigate(['/invoice'])
        .then(() => {
          this.messageService.add('Faktúra bola uložená');
        });
    });
  }
}
