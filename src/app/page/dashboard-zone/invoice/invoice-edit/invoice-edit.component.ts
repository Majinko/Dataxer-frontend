import {Component, OnInit} from '@angular/core';
import {InvoiceService} from '../../../../core/services/invoice.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {APP_DATE_FORMATS} from '../../../../../helper';
import {DocumentHelper} from '../../../../core/class/DocumentHelper';
import {Invoice} from '../../../../core/models/invoice';
import {MessageService} from '../../../../core/services/message.service';

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
  submitted = false;
  moreOptions = false;

  invoice: Invoice;

  constructor(
    public documentHelper: DocumentHelper,
    private formBuilder: FormBuilder,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.getById();
    this.prepareForm();
  }

  // prepare form
  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      id: null,
      contact: [null],
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
      dueDate: null,
      note: '',
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
    });

    this.invoiceService.update(this.formGroup.value).subscribe((r) => {
      this.messageService.add('Faktúra bola aktualizovaná');
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
