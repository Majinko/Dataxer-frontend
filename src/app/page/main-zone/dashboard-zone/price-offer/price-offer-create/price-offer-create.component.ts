import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {PriceOfferService} from 'src/app/core/services/priceOffer.service';
import {MessageService} from 'src/app/core/services/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentHelper} from '../../../../../core/class/DocumentHelper';
import {UserService} from '../../../../../core/services/user.service';
import {NumberingService} from '../../../../../core/services/numbering.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {addDays, APP_DATE_FORMATS} from '../../../../../../helper';
import {BankAccountService} from '../../../../../core/services/bank-account.service';
import {DemandPackItem, Pack} from '../../../../../core/models/pack';
import {DocumentHelperClass} from '../../../../../core/class/DocumentHelperClass';
import {ProjectService} from '../../../../../core/services/project.service';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {DemandService} from '../../../../../core/services/demand.service';
import {BudgetService} from '../../../../../core/services/budget.service';
import {CategoryItemNode} from '../../../../../core/models/category-item-node';
import {Project} from '../../../../../core/models/project';

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
export class PriceOfferCreateComponent extends DocumentHelperClass implements OnInit {
  submitted: boolean = false;
  demandId: number;
  demandPack: Pack[] = [];
  oldPacks: Pack[] = [];
  demandPackItems: DemandPackItem[] = [];
  documentType: string = 'PRICE_OFFER';
  projectId: number;
  differentProject: boolean = false;
  differentCategory: boolean = false;

  categories: CategoryItemNode[] = [];

  @ViewChild('slide', {static: false}) slide: MatSlideToggle;

  constructor(
    protected numberingService: NumberingService,
    protected bankAccountService: BankAccountService,
    protected messageService: MessageService,
    protected projectService: ProjectService,
    protected router: Router,
    public route: ActivatedRoute,
    private budgetService: BudgetService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private priceOfferService: PriceOfferService,
    public documentHelper: DocumentHelper,
    private demandService: DemandService,
  ) {
    super(bankAccountService, numberingService, messageService, router, route, projectService);
  }

  ngOnInit() {
    this.prepareForm();
    this.changeForm();
    this.getProject();
    this.handleChangeProject();

    this.route.params.subscribe(params => {
      if (params.projectId) {
        this.projectId = params.projectId;
        this.preparePriceOfferFromBudget(params.projectId, params.itemIds);
      }
    });

    if (this.route.snapshot.paramMap.get('demandId')) {
      this.formGroup.addControl('isPackComplex', this.formBuilder.control(true));
      this.formGroup.addControl('demandId', this.formBuilder.control(this.demandId));

      this.demandId = +this.route.snapshot.paramMap.get('demandId');

      this.gedDemandPackItem();
    }

    if (this.route.snapshot.paramMap.get('id') === null) {
      this.pathUser();
    } else {
      this.checkDuplicate();
    }
  }

  // get demand pack items
  private gedDemandPackItem() {
    this.demandService.getById(this.demandId).subscribe(d => {
      this.formGroup.get('contact').patchValue(d.company);
    });
    this.demandService.gedDemandPackItem(this.demandId).subscribe((demandPackItems) => {
      this.demandPackItems = demandPackItems;
    });
  }

  // handle change project
  private handleChangeProject() {
    this.formGroup.get('project').valueChanges.subscribe((project: Project) => {
      if (project && project.id) {
        this.projectService.getCategories(project.id).subscribe((categories) => {
          this.categories = categories;
        });
      }
    });
  }

  // prepare form
  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      contact: [null, Validators.required],
      project: [null, Validators.required],
      category: null,
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

  private checkDuplicate() {
    if (+this.route.snapshot.paramMap.get('id')) {
      this.priceOfferService.duplicate(+this.route.snapshot.paramMap.get('id')).subscribe((oldPriceOffer) => {
        this.pathFromOldObject(oldPriceOffer);

        this.pathUser();
      });
    }
  }

  // todo dry .. is in price offer cost invoice
  private pathUser() {
    this.formGroup.get('documentData.user').patchValue(this.userService.user);
  }

  private preparePacksFromDemandItem() {
    this.formGroup.get('packs').patchValue([]);

    // this.demandPackItems.

    // todo dokoncit zajtra
    console.log(this.demandPackItems);
  }

  // submit form
  submit(type: string) {
    this.submitted = true;

    // demand is in complex rezime
    if (this.demandId && this.f.isPackComplex && this.f.isPackComplex.value === true) {
      this.preparePacksFromDemandItem();
    }

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
      packs: this.documentHelper.packs
    });

    this.isLoad = true;

    if (this.projectId) {
      this.priceOfferService.storeFromBudget(this.formGroup.value, this.projectId).subscribe((r) => {
        this.isLoad = false;
        this.router
          .navigate(['/paginate/priceOffers'])
          .then(() => this.messageService.add('Cenová ponuka bola uložená'));
      });
    } else {
      this.priceOfferService.store(this.formGroup.value).subscribe((r) => {
        this.isLoad = false;
        this.router
          .navigate(['/paginate/priceOffers'])
          .then(() => this.messageService.add('Cenová ponuka bola uložená'));
      });
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  private preparePriceOfferFromBudget(projectId: string, itemIds: string) {
    this.budgetService.getBudgetData(projectId, itemIds).subscribe((data) => {
      this.formGroup.get('project').patchValue(data.project);
      this.formGroup.get('contact').patchValue(data.contact);
      this.oldPacks = data.packs;
    });
  }
}
