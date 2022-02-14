import {Component, OnInit} from '@angular/core';
import {CostService} from '../../../../core/services/cost.service';
import {Cost} from '../../../../core/models/cost';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {COSTSTATES, COSTTYPES} from '../../../../core/data/costs';
import {CRURRENCIES} from '../../../../core/data/currencies';
import {UploadHelper} from '../../../../core/class/UploadHelper';
import {AddPercentPipe} from '../../../../core/pipes/add-percent.pipe';
import {MessageService} from '../../../../core/services/message.service';
import {addDays, APP_DATE_FORMATS, findInvalidControls} from '../../../../../helper';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {CategoryService} from '../../../../core/services/category.service';
import {CategoryItemNode} from '../../../../core/models/category-item-node';
import {Project} from '../../../../core/models/project';
import {ProjectService} from '../../../../core/services/project.service';

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
    AddPercentPipe
  ],
})
export class CostEditComponent implements OnInit {
  cost: Cost;
  categories: CategoryItemNode[] = [];

  formGroup: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;

  costTypes = COSTTYPES;
  costStates = COSTSTATES;
  currencies = CRURRENCIES;

  constructor(
    public uploadHelper: UploadHelper,
    private formBuilder: FormBuilder,
    private addPercent: AddPercentPipe,
    private costService: CostService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private projectService: ProjectService
  ) {
  }

  ngOnInit() {
    this.prepareForm();
    this.getCost();
    this.changeValue();
  }

  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      id: null,
      title: [null, Validators.required],
      type: null,
      state: null,
      company: [null, Validators.required],
      isInternal: false,
      isRepeated: false,
      period: null,
      repeatedFrom: null,
      repeatedTo: null,
      contact: [null, Validators.required],
      project: [null, Validators.required],
      categories: [null, Validators.required],
      note: null,
      number: null,
      variableSymbol: null,
      constantSymbol: null,
      createdDate: [new Date(), Validators.required],
      deliveredDate: [new Date(), Validators.required],
      dueDate: null,
      taxableSupply: null,
      currency: this.currencies[0].value,
      price: [null, Validators.required],
      tax: 20,
      totalPrice: 0,
      paymentMethod: null,
      paymentDate: null,
    });
  }

  private changeValue() {
    this.formGroup.valueChanges.subscribe((value) => {
      this.formGroup.patchValue({
        totalPrice: +this.addPercent.transform(value.price, value.tax)
      }, {emitEvent: false});
    });
  }

  private handleChangeProject() {
    this.formGroup.get('project').valueChanges.subscribe((project: Project) => {
      this.projectService.getCategories(project.id).subscribe((categories) => {
        this.categories = categories;

        this.patchCategory();
      });
    });
  }

  private patchCategory() {
    if (this.formGroup.dirty === false) { // nastavim to len prvy krat
      this.formGroup.patchValue({
        categories: this.cost.categories[0]
      });
    }
  }

  private getCost() {
    this.costService.getById(+this.route.snapshot.paramMap.get('id')).subscribe(cost => {
      this.cost = cost;

      if (!this.cost.isInternal) {
        this.handleChangeProject();
      } else {
        this.getInternalCategories();
      }

      this.formGroup.patchValue(this.cost);
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  submit() {
    this.formGroup.patchValue({
      categories: [this.formGroup.get('categories').value]
    });

    this.submitted = true;
    this.isLoading = true;

    if (this.formGroup.invalid) {
      this.isLoading = false;
      return;
    }

    this.costService.updateWithFiles(this.formGroup.value, this.uploadHelper.files).subscribe(() => {
      this.router.navigate(['/document/cost']).then(() => {
        this.messageService.add('Náklad bol aktualizovaný');
        this.isLoading = false;
      });
    });
  }

  private getInternalCategories() {
    this.categoryService.fallByGroupIn(['COMPANY', 'SALARY'], false).subscribe((categories) => {
      this.categories = categories;

      this.patchCategory(); // po prvy krat sa len nastavuje kategoria

      if (this.formGroup.dirty === false) {
        this.formGroup.get('project').clearValidators();
        this.formGroup.get('project').patchValue(null, {emitEvent: false});
      }
    });
  }

  getFirmGroupCategories() {
    if (this.f.isInternal.value === true) {
      this.getInternalCategories();
      this.formGroup.get('project').clearValidators();
      this.formGroup.get('project').patchValue(null, {emitEvent: false});
    } else {
      this.handleChangeProject();
      this.formGroup.get('project').addValidators(Validators.required);
    }

    this.formGroup.controls.project.updateValueAndValidity({emitEvent: false});
  }
}
