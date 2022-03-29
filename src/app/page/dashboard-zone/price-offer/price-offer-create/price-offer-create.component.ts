import {AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PriceOfferService} from 'src/app/core/services/priceOffer.service';
import {MessageService} from 'src/app/core/services/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentHelper} from '../../../../core/class/DocumentHelper';
import {UserService} from '../../../../core/services/user.service';
import {NumberingService} from '../../../../core/services/numbering.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {addDays, APP_DATE_FORMATS} from '../../../../../helper';
import {BankAccountService} from '../../../../core/services/bank-account.service';
import {Pack} from '../../../../core/models/pack';
import {PriceOffer} from '../../../../core/models/priceOffer';
import {DocumentHelperClass} from '../../../../core/class/DocumentHelperClass';
import {ProjectService} from '../../../../core/services/project.service';
import {DemandItem, DocumentItem} from '../../../../core/models/documentItem';
import {DemandService} from '../../../../core/services/demand.service';
import {MatSlideToggle, MatSlideToggleChange} from '@angular/material/slide-toggle';

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
export class PriceOfferCreateComponent extends DocumentHelperClass implements OnInit, AfterViewChecked {
  formGroup: FormGroup;
  submitted: boolean = false;
  demandOffer = false;
  demandPack: Pack[] = [];
  oldPacks: Pack[] = [];
  documentItems: DemandItem[] = [];
  documentType: string = 'PRICE_OFFER';
  simpleDemandPacks = {
    packs: []
  };

  @ViewChild('slide', { static: false }) slide: MatSlideToggle;

  constructor(
    protected numberingService: NumberingService,
    protected bankAccountService: BankAccountService,
    protected messageService: MessageService,
    protected projectService: ProjectService,
    protected router: Router,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private demandService: DemandService,
    private userService: UserService,
    private priceOfferService: PriceOfferService,
    public documentHelper: DocumentHelper,
    private cdr: ChangeDetectorRef
  ) {
    super(bankAccountService, numberingService, messageService, router, route, projectService);
  }

  ngOnInit() {
    this.prepareForm();
    this.changeForm();
    this.getProject();

    if (this.route.snapshot.paramMap.get('demandId')) {
      this.demandOffer = true;
      this.demand();
    }

    if (this.route.snapshot.paramMap.get('id') === null) {
      this.preparePriceOfferData();
    } else {
      this.checkDuplicate();
    }
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  // prepare form
  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      contact: [null, Validators.required],
      project: [null, Validators.required],
      title: ['', Validators.required],
      subject: '',
      number: ['', Validators.required],
      state: 'WAITING',
      company: [null, Validators.required],
      createdDate: [new Date(), Validators.required],
      deliveredDate: [new Date(), Validators.required],
      dueDate: [addDays(new Date(), 14)],
      note: null,
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

  private demand() {
    this.demandService.gedDemandPackItem(+this.route.snapshot.paramMap.get('demandId')).subscribe(demandItems => {
      this.documentItems = demandItems;
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

  private pathFromOldObject(document: PriceOffer) {
    this.oldPacks = document.packs;

    this.formGroup.patchValue({
      subject: document.subject,
      company: document.company,
      contact: document.contact,
      project: document.project,
      discount: document.discount === null ? 0 : document.discount,
    });
  }
  // submit form
  submit(type: string) {
    this.submitted = true;

    if (this.formGroup.invalid) {
      setTimeout(() => {
        this.documentHelper.scrollIfFormHasErrors(this.formGroup).then(() => {
          this.messageService.add('Prosíme o skontrolovanie povinných údajov');
        });
      }, 100);
      return;
    }
    // set offer price and total price
    this.formGroup.patchValue({
      price: this.documentHelper.price,
      totalPrice: this.documentHelper.totalPrice,
    });
    if (this.demandOffer && this.slide.checked) {
      this.formGroup.get('packs').patchValue([]);
      this.documentItems.forEach( f => {
        f.packs.forEach( p => {
          const item = JSON.parse(JSON.stringify(f));
          delete item.packs;
          p.demandItem = item;
          this.formGroup.get('packs').value.push(p);
        });
      });
    } else if (this.demandOffer && !this.slide.checked) {
      this.formGroup.get('packs').patchValue([]);
      this.formGroup.get('packs').value.push(this.simpleDemandPacks.packs[0]);
    }
    console.log(this.formGroup.value);
    return;
    this.priceOfferService.store(this.formGroup.value).subscribe((r) => {
      this.router
        .navigate(['/document/priceOffer'])
        .then(() => this.messageService.add('Cenová ponuka bola uložená'));
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

}
