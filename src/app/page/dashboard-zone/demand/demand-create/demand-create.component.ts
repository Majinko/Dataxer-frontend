import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../../core/services/category.service';
import {CategoryItemNode} from '../../../../core/models/category-item-node';
import {DemandService} from '../../../../core/services/demand.service';
import {MessageService} from '../../../../core/services/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DocumentHelper} from '../../../../core/class/DocumentHelper';
import {addDays, APP_DATE_FORMATS} from '../../../../../helper';
import {DocumentHelperClass} from '../../../../core/class/DocumentHelperClass';
import {Pack} from '../../../../core/models/pack';
import {BankAccountService} from '../../../../core/services/bank-account.service';
import {NumberingService} from '../../../../core/services/numbering.service';
import {PriceOfferService} from '../../../../core/services/priceOffer.service';
import {PriceOffer} from '../../../../core/models/priceOffer';
import {UserService} from '../../../../core/services/user.service';
import {ContactService} from '../../../../core/services/contact.service';
import {Contact} from '../../../../core/models/contact';
import {Demand} from '../../../../core/models/demand';

@Component({
  selector: 'app-demand-create',
  templateUrl: './demand-create.component.html',
  styleUrls: ['./demand-create.component.scss'],
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
export class DemandCreateComponent extends DocumentHelperClass implements OnInit {
  formGroup: FormGroup;
  submitted: boolean = false;
  oldPacks: Pack[] = [];
  contacts: Contact[] = [];
  documentType: string = 'DEMAND';

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private demandService: DemandService,
    protected messageService: MessageService,
    protected router: Router,
    private contactService: ContactService,
    public route: ActivatedRoute,
    protected numberingService: NumberingService,
    protected bankAccountService: BankAccountService,
    private userService: UserService,
    private priceOfferService: PriceOfferService,
    public documentHelper: DocumentHelper,
  ) {
    super(bankAccountService, numberingService, messageService, router, route);
  }

  ngOnInit(): void {
    this.prepareForm();
    this.changeForm();
    this.getContacts();

    if (this.route.snapshot.paramMap.get('id') === null) {
      this.prepareDemand();
    } else {
      this.checkDuplicate();
    }
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
      documentType: 'DEMAND',
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
      this.demandService.duplicate(+this.route.snapshot.paramMap.get('id')).subscribe((oldDemand) => {
        this.pathFromOldObject(oldDemand);

        this.prepareDemand();
      });
    }
  }

  // set user
  private prepareDemand() {
    this.formGroup.get('documentData.user').patchValue(this.userService.user);
  }

  private pathFromOldObject(document: Demand) {
    this.oldPacks = document.packs;

    this.formGroup.patchValue({
      subject: document.subject,
      company: document.company,
      contact: document.contact,
      project: document.project,
      discount: document.discount === null ? 0 : document.discount,
    });
  }

  getContacts() {
    this.contactService.all().subscribe(contact => this.contacts = contact);
  }


  // submit form
  submit(type: string) {
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

    console.log(this.formGroup.value);
    return;

    this.demandService.store(this.formGroup.value).subscribe((r) => {
      this.router
        .navigate(['/document/demand'])
        .then(() => this.messageService.add('Cenová ponuka bola uložená'));
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
