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
import {BankAccountService} from '../../../../core/services/bank-account.service';
import {DocumentHelperClass} from '../../../../core/class/DocumentHelperClass';
import {NumberingService} from '../../../../core/services/numbering.service';
import {ProjectService} from '../../../../core/services/project.service';

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
export class InvoiceEditComponent extends DocumentHelperClass implements OnInit {
  formGroup: FormGroup;
  isEdit = true;
  submitted: boolean = false;
  moreOptions: boolean = false;

  invoice: Invoice;

  constructor(
    protected numberingService: NumberingService,
    protected bankAccountService: BankAccountService,
    protected messageService: MessageService,
    protected projectService: ProjectService,
    protected route: ActivatedRoute,
    protected router: Router,
    public documentHelper: DocumentHelper,
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private invoiceService: InvoiceService,
  ) {
    super(bankAccountService, numberingService, messageService, router, route, projectService);
  }

  ngOnInit(): void {
    this.getProject();
    this.getById();
  }

  // prepare form
  private prepareForm(invoice: Invoice) {
    this.formGroup = this.formBuilder.group({
      id: invoice.id,
      contact: [invoice.contact, Validators.required],
      project: [invoice.project],
      title: [invoice.title, Validators.required],
      subject: invoice.subject,
      company: [invoice.company, Validators.required],
      number: [invoice.number, Validators.required],
      variableSymbol: [invoice.variableSymbol, Validators.required],
      documentType: invoice.documentType,
      constantSymbol: invoice.constantSymbol,
      specificSymbol: invoice.specificSymbol,
      paymentMethod: 'BANK_PAYMENT',
      paymentDate: invoice.paymentDate,
      deliveryMethod: 'MAIL',
      createdDate: [invoice.createdDate, Validators.required],
      deliveredDate: [invoice.deliveredDate, Validators.required],
      dueDate: invoice.dueDate,
      note: invoice.note,
      discount: invoice.discount,
      price: invoice.price,
      totalPrice: invoice.totalPrice,
      documentData: this.formBuilder.group({
        user: this.formBuilder.group({
          displayName: invoice.documentData.user.displayName,
          phone: invoice.documentData.user.phone,
          email: invoice.documentData.user.email,
        }),
        firm: invoice.documentData.firm,
        contact: invoice.documentData.contact,
        bankAccount: invoice.documentData.bankAccount,
      }),

      packs: this.formBuilder.array([])
    });
  }

  getById() {
    this.invoiceService.getById(+this.route.snapshot.paramMap.get('id')).subscribe((invoice => {
      this.invoice = invoice;

      this.prepareForm(invoice);
      this.changeForm();
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
      this.router.navigate(['/document/invoice']).then(() => {
        this.messageService.add('Faktúra bola aktualizovaná');
      });
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
