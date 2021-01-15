import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../../core/services/message.service';
import {Router} from '@angular/router';
import {DocumentHelper} from '../../../../core/class/DocumentHelper';
import {InvoiceService} from '../../../../core/services/invoice.service';
import {UserService} from '../../../../core/services/user.service';
import {addDays, APP_DATE_FORMATS} from '../../../../../helper';
import {NumberingService} from '../../../../core/services/numbering.service';
import {CompanyService} from '../../../../core/services/company.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';

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
    DocumentHelper
  ],
})
export class InvoiceCreateComponent implements OnInit {
  formGroup: FormGroup;
  submitted = false;
  moreOptions = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private companyService: CompanyService,
    private messageService: MessageService,
    private router: Router,
    private invoiceService: InvoiceService,
    private numberingService: NumberingService,
    public documentHelper: DocumentHelper
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();
    this.prepareInvoiceData();
  }

  // prepare form
  private prepareForm() {
    this.formGroup = this.formBuilder.group({
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
      dueDate: [addDays(new Date(), 14)],
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
        firm: this.companyService.company
      }),

      packs: this.formBuilder.array([])
    });
  }

  // set user
  private prepareInvoiceData() {
    this.formGroup.get('documentData.user').patchValue(this.userService.user);

    this.numberingService.generateNextNumberByDocumentType('INVOICE').subscribe(r => {
      this.formGroup.patchValue({number: r, variableSymbol: r});
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
    });

    this.invoiceService.store(this.formGroup.value).subscribe((r) => {
      this.router
        .navigate(['/invoice'])
        .then(() => this.messageService.add('Faktura ponuka bola ulozna'));
    });
  }
}
