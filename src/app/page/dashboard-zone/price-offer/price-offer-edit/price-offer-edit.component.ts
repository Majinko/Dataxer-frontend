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
export class PriceOfferEditComponent implements OnInit {
  priceOffer: PriceOffer;
  formGroup: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private priceOfferService: PriceOfferService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    public documentHelper: DocumentHelper
  ) {
  }

  ngOnInit() {
    this.prepareForm();
    this.changeForm();
    this.getById();
  }

  getById() {
    this.priceOfferService.getById(+this.route.snapshot.paramMap.get('id')).subscribe(p => {
      this.priceOffer = p;

      this.formGroup.patchValue(p);
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

  // prepare form
  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      id: null,
      contact: [null, Validators.required],
      project: [null, Validators.required],
      title: ['', Validators.required],
      subject: '',
      number: ['', Validators.required],
      state: '',
      company: [null, Validators.required],
      createdDate: [new Date(), Validators.required],
      deliveredDate: [new Date(), Validators.required],
      dueDate: [new Date()],
      note: null,
      noteToRecipient: '',
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
      this.router.navigate(['/price-offer']).then(() => {
        this.messageService.add('Cenová ponuka bola uložená');
      });
    });
  }
}
