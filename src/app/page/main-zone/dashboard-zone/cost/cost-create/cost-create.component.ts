import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {COSTSTATES, COSTTYPES} from '../../../../../core/data/costs';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {addDays, APP_DATE_FORMATS} from '../../../../../../helper';
import {CRURRENCIES} from '../../../../../core/data/currencies';
import {AddPercentPipe} from '../../../../../core/pipes/add-percent.pipe';
import {CostService} from '../../../../../core/services/cost.service';
import {MessageService} from '../../../../../core/services/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryItemNode} from '../../../../../core/models/category-item-node';
import {ProjectService} from '../../../../../core/services/project.service';
import {DocumentHelper} from '../../../../../core/class/DocumentHelper';
import {DocumentHelperClass} from '../../../../../core/class/DocumentHelperClass';
import {NumberingService} from '../../../../../core/services/numbering.service';
import {BankAccountService} from '../../../../../core/services/bank-account.service';
import {DemandService} from '../../../../../core/services/demand.service';
import {UserService} from '../../../../../core/services/user.service';
import {UploadHelper} from '../../../../../core/class/UploadHelper';
import {Project} from '../../../../../core/models/project';

@Component({
  selector: 'app-cost-create',
  templateUrl: './cost-create.component.html',
  styleUrls: ['./cost-create.component.scss'],
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
export class CostCreateComponent extends DocumentHelperClass implements OnInit {
  formGroup: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  documentType = 'COST';
  differentProject: boolean = false;
  differentCategory: boolean = false;

  categories: CategoryItemNode[] = [];

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
    this.changeForm();
    this.getProject();
    this.handleChangeProject();

    // path user
    this.formGroup.get('documentData.user').patchValue(this.userService.user);
  }

  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      title: [null, Validators.required],
      type: null,
      state: null,
      company: [null, Validators.required],
      isRepeated: false,
      isInfinity: null,
      period: null,
      repeatedFrom: null,
      repeatedTo: null,
      contact: [null, Validators.required],
      project: [null, Validators.required],
      category: null,
      note: null,
      number: null,
      variableSymbol: null,
      constantSymbol: null,
      nextRepeatedCost: null,
      createdDate: [new Date(), Validators.required],
      deliveredDate: [new Date(), Validators.required],
      dueDate: [addDays(new Date(), 14)],
      taxableSupply: null,
      currency: this.currencies[0].value,
      price: [null],
      documentType: 'COST',
      totalPrice: null,
      discount: 0,
      paymentMethod: null,
      paymentDate: null,
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

  // change checkbox for repeated cost
  handleRepeatedCostChange(checked: boolean) {
    this.formGroup.patchValue({
      period: checked ? 'MONTH' : null,
      isInfinity: checked ? true : null,
      repeatedFrom: checked ? new Date() : null
    });
  }

  // handle change project
  private handleChangeProject() {
    this.formGroup.get('project').valueChanges.subscribe((project: Project) => {
      this.projectService.getCategories(project.id).subscribe((categories) => {
        this.categories = categories;
      });
    });
  }

  submit() {
    this.submitted = true;
    this.isLoading = true;

    if (this.formGroup.invalid) {
      setTimeout(() => {
        this.documentHelper.scrollIfFormHasErrors(this.formGroup).then(() => {
          this.messageService.add('Prosíme o skontrolovanie povinných údajov');
        });
      }, 100);

      this.isLoading = false;

      return;
    }

    if (this.f.isRepeated.value === true) {
      this.formGroup.patchValue({
        nextRepeatedCost: this.f.repeatedFrom.value
      });
    }

    this.costService.storeWithFiles(this.formGroup.value, this.uploadHelper.files).subscribe(() => {
      this.isLoading = false;
      this.router.navigate(['/paginate/costs']).then(() => {
        this.uploadHelper.files = [];
        this.messageService.add('Náklad bol pridaný');
      });
    }, error => {
      this.isLoading = false;
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
