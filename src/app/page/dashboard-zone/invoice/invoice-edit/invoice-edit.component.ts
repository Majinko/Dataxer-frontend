import {Component, OnInit} from '@angular/core';
import {InvoiceService} from '../../../../core/services/invoice.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {APP_DATE_FORMATS} from '../../../../../helper';
import {DocumentHelper} from '../../../../core/class/DocumentHelper';
import {Invoice} from '../../../../core/models/invoice';
import {MessageService} from '../../../../core/services/message.service';
import {CompanyService} from '../../../../core/services/company.service';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss'],
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
    DocumentHelper
  ],
})
export class InvoiceEditComponent implements OnInit {
  formGroup: FormGroup;
  submitted: boolean = false;
  moreOptions: boolean = false;

  invoice: Invoice;

  constructor(
    public documentHelper: DocumentHelper,
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.getById();
    this.prepareForm();
    this.changeForm();
  }

  // prepare form
  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      id: null,
      contact: [null, Validators.required],
      project: [null, Validators.required],
      title: ['', Validators.required],
      subject: '',
      number: ['', Validators.required],
      variableSymbol: ['', Validators.required],
      documentType: null,
      constantSymbol: '0308',
      specificSymbol: '',
      paymentMethod: 'BANK_PAYMENT',
      paymentDate: null,
      deliveryMethod: 'MAIL',
      createdDate: [new Date(), Validators.required],
      deliveredDate: [new Date(), Validators.required],
      dueDate: null,
      note: null,
      headerComment: '',
      discount: 0,
      price: 0,
      totalPrice: 0,
      documentData: this.formBuilder.group({
        user: this.formBuilder.group({
          displayName: '',
          phone: '',
          email: '',
        }),
        firm: null,
        contact: null,
        bankAccount: null,
      }),

      packs: this.formBuilder.array([])
    });
  }

  // detect change form
  private changeForm() {
    this.formGroup.valueChanges.subscribe(v => {
      this.formGroup.get('documentData').patchValue({
        contact: v.contact
      }, {emitEvent: false});
    });

    this.formGroup.get('company').valueChanges.subscribe((company) => {
      this.formGroup.get('documentData').patchValue({
        firm: company
      }, {emitEvent: false});
    });
  }

  getById() {
    this.invoiceService.getById(+this.route.snapshot.paramMap.get('id')).subscribe((invoice => {
      this.invoice = invoice;

      this.formGroup.patchValue(invoice);
    }));
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

    this.invoiceService.update(this.formGroup.value).subscribe((r) => {
      this.router.navigate(['/invoice']).then(() => {
        this.messageService.add('Faktúra bola aktualizovaná');
      });
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
