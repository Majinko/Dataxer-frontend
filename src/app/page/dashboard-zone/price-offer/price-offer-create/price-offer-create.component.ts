import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PriceOfferService} from 'src/app/core/services/priceOffer.service';
import {MessageService} from 'src/app/core/services/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentHelper} from '../../../../core/class/DocumentHelper';
import {UserService} from '../../../../core/services/user.service';
import {NumberingService} from '../../../../core/services/numbering.service';
import {CompanyService} from '../../../../core/services/company.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {addDays, APP_DATE_FORMATS} from '../../../../../helper';
import {BankAccountService} from '../../../../core/services/bank-account.service';
import {Pack} from '../../../../core/models/pack';
import {PriceOffer} from '../../../../core/models/priceOffer';
import {Company} from "../../../../core/models/company";

@Component({
  selector: 'app-create',
  templateUrl: './price-offer-create.component.html',
  styleUrls: ['./price-offer-create.component.scss'],
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
export class PriceOfferCreateComponent implements OnInit {
  formGroup: FormGroup;
  submitted: boolean = false;
  oldPacks: Pack[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private priceOfferService: PriceOfferService,
    private messageService: MessageService,
    private numberingService: NumberingService,
    private bankAccountService: BankAccountService,
    private companyService: CompanyService,
    private router: Router,
    public documentHelper: DocumentHelper,
    public route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.prepareForm();
    if (this.route.snapshot.paramMap.get('id') === null) {
      this.preparePriceOfferData();
    } else {
      this.checkDuplicate();
    }
    this.changeForm();
    this.getDefaultBankAccount();
  }

  // prepare form
  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      contact: [null, Validators.required],
      project: [null, Validators.required],
      title: ['', Validators.required],
      subject: '',
      number: ['', Validators.required],
      state: null,
      createdDate: [new Date(), Validators.required],
      deliveredDate: [new Date(), Validators.required],
      dueDate: [addDays(new Date(), 14)],
      note: null,
      noteToRecipient: '',
      discount: 0,
      price: 0,
      totalPrice: 0,
      documentType: 'PRICE_OFFER',
      documentData: this.formBuilder.group({
        user: this.formBuilder.group({
          displayName: '',
          phone: '',
          email: '',
        }),
        contact: null,
        bankAccount: null,
        firm: null
      }),

      packs: this.formBuilder.array([])
    });
  }

  private checkDuplicate() {
    if (+this.route.snapshot.paramMap.get('id')) {
      this.priceOfferService.duplicate(+this.route.snapshot.paramMap.get('id')).subscribe((oldPriceOffer) => {
        this.pathFromOldObject(oldPriceOffer);

        this.preparePriceOfferData();
      });
    }
  }

  // set user
  private preparePriceOfferData() {
    this.formGroup.get('documentData.user').patchValue(this.userService.user);
  }

  // next company number
  private prepareDocumentNumber(company: Company) {
    this.numberingService.generateNextNumberByDocumentType('PRICE_OFFER', company.id).subscribe(r => {
      this.formGroup.patchValue({
        number: r,
        title: 'Cenová ponuka ' + r
      }, {emitEvent: false});

      this.formGroup.get('company').valueChanges.subscribe((c) => {
        this.formGroup.get('documentData').patchValue({
          firm: company
        }, {emitEvent: false});
      });
    });
  }

  // detect change form
  private changeForm() {
    this.formGroup.get('company').valueChanges.subscribe((company) => {
      this.prepareDocumentNumber(company);
    });

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

  private pathFromOldObject(document: PriceOffer) {
    this.oldPacks = document.packs;

    this.formGroup.patchValue({
      contact: document.contact,
      project: document.project,
      discount: document.discount === null ? 0 : document.discount,
    });
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
      packs: this.documentHelper.packs
    });

    this.priceOfferService.store(this.formGroup.value).subscribe((r) => {
      this.router
        .navigate(['/price-offer'])
        .then(() => this.messageService.add('Cenová ponuka bola uložená'));
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
