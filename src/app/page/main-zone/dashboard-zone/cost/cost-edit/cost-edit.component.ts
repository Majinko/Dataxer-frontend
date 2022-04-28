import {Component, OnInit} from '@angular/core';
import {CostService} from '../../../../../core/services/cost.service';
import {Cost} from '../../../../../core/models/cost';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {COSTSTATES, COSTTYPES} from '../../../../../core/data/costs';
import {CRURRENCIES} from '../../../../../core/data/currencies';
import {UploadHelper} from '../../../../../core/class/UploadHelper';
import {AddPercentPipe} from '../../../../../core/pipes/add-percent.pipe';
import {MessageService} from '../../../../../core/services/message.service';
import {addDays, APP_DATE_FORMATS} from '../../../../../../helper';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {CategoryItemNode} from '../../../../../core/models/category-item-node';
import {ProjectService} from '../../../../../core/services/project.service';
import {DocumentHelperClass} from '../../../../../core/class/DocumentHelperClass';
import {NumberingService} from '../../../../../core/services/numbering.service';
import {BankAccountService} from '../../../../../core/services/bank-account.service';
import {DemandService} from '../../../../../core/services/demand.service';
import {UserService} from '../../../../../core/services/user.service';
import {DocumentHelper} from '../../../../../core/class/DocumentHelper';

@Component({
  selector: 'app-cost-edit',
  templateUrl: './cost-edit.component.html',
  styleUrls: ['./cost-edit.component.scss'],
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
    DocumentHelper,
    AddPercentPipe
  ],
})
export class CostEditComponent extends DocumentHelperClass implements OnInit {
  cost: Cost;
  categories: CategoryItemNode[] = [];

  formGroup: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;

  costTypes = COSTTYPES;
  costStates = COSTSTATES;
  currencies = CRURRENCIES;

  constructor(
    protected numberingService: NumberingService,
    protected bankAccountService: BankAccountService,
    protected messageService: MessageService,
    protected projectService: ProjectService,
    protected router: Router,
    public route: ActivatedRoute,
    public uploadHelper: UploadHelper,
    private formBuilder: FormBuilder,
    private demandService: DemandService,
    private userService: UserService,
    private costService: CostService,
    public documentHelper: DocumentHelper,
  ) {
    super(bankAccountService, numberingService, messageService, router, route, projectService);
  }

  ngOnInit() {
    this.prepareForm();
    this.getCost();
    this.changeForm();
  }

  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      id: null,
      title: [null, Validators.required],
      type: null,
      state: null,
      company: [null, Validators.required],
      isRepeated: false,
      period: null,
      repeatedFrom: null,
      repeatedTo: null,
      contact: [null, Validators.required],
      project: [null, Validators.required],
      note: null,
      number: null,
      variableSymbol: null,
      constantSymbol: null,
      createdDate: [new Date(), Validators.required],
      deliveredDate: [new Date(), Validators.required],
      dueDate: [addDays(new Date(), 14)],
      taxableSupply: null,
      currency: this.currencies[0].value,
      price: [null],
      documentType: 'COST',
      totalPrice: null,
      discount: 0,
      documentData: this.formBuilder.group({
        contact: null,
        firm: null,
        user: this.formBuilder.group({
          displayName: '',
          phone: '',
          email: '',
        }),
      }),

      packs: this.formBuilder.array([])
    });
  }


  private getCost() {
    this.costService.getById(+this.route.snapshot.paramMap.get('id')).subscribe(cost => {
      this.cost = cost;

      this.formGroup.patchValue(this.cost);
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  submit() {
    this.submitted = true;
    this.isLoading = true;

    if (this.formGroup.invalid) {
      this.isLoading = false;
      return;
    }

    // set offer price and total price
    this.formGroup.patchValue({
      price: this.documentHelper.price,
      totalPrice: this.documentHelper.totalPrice,
    });

    this.costService.updateWithFiles(this.formGroup.value, this.uploadHelper.files).subscribe(() => {
      this.router.navigate(['/paginate/costs']).then(() => {
        this.messageService.add('Náklad bol aktualizovaný');
        this.isLoading = false;
      });
    });
  }
}
