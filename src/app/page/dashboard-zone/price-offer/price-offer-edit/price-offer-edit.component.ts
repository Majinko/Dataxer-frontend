import {Component, OnInit} from '@angular/core';
import {PriceOffer} from '../../../../core/models/priceOffer';
import {ActivatedRoute, Router} from '@angular/router';
import {PriceOfferService} from '../../../../core/services/priceOffer.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DocumentHelper} from '../../../../core/class/DocumentHelper';
import {MessageService} from '../../../../core/services/message.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {APP_DATE_FORMATS} from '../../../../../helper';
import {BankAccountService} from '../../../../core/services/bank-account.service';
import {DocumentHelperClass} from '../../../../core/class/DocumentHelperClass';
import {NumberingService} from '../../../../core/services/numbering.service';
import {ProjectService} from "../../../../core/services/project.service";

@Component({
  selector: 'app-price-offer-edit',
  templateUrl: './price-offer-edit.component.html',
  styleUrls: ['./price-offer-edit.component.scss'],
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
export class PriceOfferEditComponent extends DocumentHelperClass implements OnInit {
  priceOffer: PriceOffer;
  formGroup: FormGroup;
  documentType: string = 'INVOICE';
  isEdit: boolean = true;
  submitted: boolean = false;

  constructor(
    protected numberingService: NumberingService,
    protected bankAccountService: BankAccountService,
    protected messageService: MessageService,
    protected router: Router,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private priceOfferService: PriceOfferService,
    protected projectService: ProjectService,
    public documentHelper: DocumentHelper,
  ) {
    super(bankAccountService, numberingService, messageService, router, route, projectService);
  }

  ngOnInit() {
    this.getById();
    this.changeForm();
  }

  getById() {
    this.priceOfferService.getById(+this.route.snapshot.paramMap.get('id')).subscribe(p => {
      this.priceOffer = p;

      this.prepareForm(p);
    });
  }

  // prepare form
  private prepareForm(priceOffer: PriceOffer) {
    this.formGroup = this.formBuilder.group({
      id: priceOffer.id,
      contact: [priceOffer.contact, Validators.required],
      project: [priceOffer.project, Validators.required],
      title: [priceOffer.title, Validators.required],
      subject: priceOffer.subject,
      number: [priceOffer.number, Validators.required],
      state: priceOffer.state,
      company: [priceOffer.company, Validators.required],
      createdDate: [priceOffer.createdDate, Validators.required],
      deliveredDate: [priceOffer.deliveredDate, Validators.required],
      dueDate: priceOffer.dueDate,
      note: priceOffer.note,
      discount: priceOffer.discount,
      price: priceOffer.price,
      totalPrice: priceOffer.totalPrice,
      documentType: 'PRICE_OFFER',
      documentData: this.formBuilder.group({
        user: this.formBuilder.group({
          displayName: priceOffer.documentData.user.displayName,
          phone: priceOffer.documentData.user.phone,
          email: priceOffer.documentData.user.email,
        }),
        firm: priceOffer.documentData.firm,
        contact: priceOffer.documentData.contact,
        bankAccount: priceOffer.documentData.bankAccount,
      }),

      packs: this.formBuilder.array([])
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  // submit form
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

    this.priceOfferService.update(this.formGroup.value).subscribe((r) => {
      this.router.navigate(['/document/priceOffer']).then(() => {
        this.messageService.add('Cenová ponuka bola uložená');
      });
    });
  }
}
