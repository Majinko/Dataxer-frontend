import {Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {PdfServiceService} from '../../../../../core/services/pdf-service.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OcrService} from '../../../../../core/services/ocr.service';
import {DOCUMENT} from '@angular/common';
import {CategoryItemNode} from '../../../../../core/models/category-item-node';
import {COSTSTATES, COSTTYPES} from '../../../../../core/data/costs';
import {CRURRENCIES} from '../../../../../core/data/currencies';
import {addDays, APP_DATE_FORMATS} from '../../../../../../helper';
import {DocumentHelperClass} from '../../../../../core/class/DocumentHelperClass';
import {NumberingService} from '../../../../../core/services/numbering.service';
import {BankAccountService} from '../../../../../core/services/bank-account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../../../../core/services/project.service';
import {MessageService} from '../../../../../core/services/message.service';
import {UserService} from '../../../../../core/services/user.service';
import {CostService} from '../../../../../core/services/cost.service';
import {DocumentHelper} from '../../../../../core/class/DocumentHelper';
import {Project} from '../../../../../core/models/project';
import {UploadHelper} from '../../../../../core/class/UploadHelper';
import {CategoryService} from '../../../../../core/services/category.service';
import {AddPercentPipe} from '../../../../../core/pipes/add-percent.pipe';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {ResizedEvent} from 'angular-resize-event';
import * as moment from 'moment';
import {Subject} from 'rxjs';
import {Cost} from '../../../../../core/models/cost';

@Component({
  selector: 'app-cost-create-from-file',
  templateUrl: './cost-create-from-file.component.html',
  styleUrls: ['./cost-create-from-file.component.scss'],
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
export class CostCreateFromFileComponent extends DocumentHelperClass implements OnInit, OnDestroy {
  formGroup: FormGroup;
  cost: Cost;
  submitted = false;
  documentData;
  event;
  isOpen = false;
  isLoading = false;
  cropData: string;
  cropDataItem: number;
  cropDataPackItem: number;
  items: number;
  documentType: string = 'COST';
  uploadFile = new Subject<boolean>();
  loadedCost = new Subject<Cost>();

  cropDate: string[] = ['createdDate', 'deliveredDate', 'dueDate', 'dueAt', 'taxableSupply'];
  cropNumber: string[] = ['price', 'tax', 'totalPrice', 'qty'];
  differentProject: boolean = false;
  differentCategory: boolean = false;
  categories: CategoryItemNode[] = [];
  costTypes = COSTTYPES;
  costStates = COSTSTATES;
  currencies = CRURRENCIES;

  @ViewChild('document') documentRef: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private pdfService: PdfServiceService,
    private formBuilder: FormBuilder,
    private ocrService: OcrService,
    protected numberingService: NumberingService,
    protected bankAccountService: BankAccountService,
    protected messageService: MessageService,
    protected projectService: ProjectService,
    protected router: Router,
    private readonly elementRef: ElementRef,
    public route: ActivatedRoute,
    private userService: UserService,
    private costService: CostService,
    public documentHelper: DocumentHelper,
    public uploadHelper: UploadHelper,
    private categoryService: CategoryService,
  ) {
    super(bankAccountService, numberingService, messageService, router, route, projectService);
  }

  ngOnInit(): void {
    this.prepareForm();
    this.getCost();
    this.changeForm();
    this.getProject();
    this.handleChangeProject();

    // path user
    this.formGroup.get('documentData.user').patchValue(this.userService.user);
    this.renderer.addClass(this.document.body, 'full-height');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'full-height');
  }

  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      name: null,
      title: [null, Validators.required],
      type: null,
      state: null,
      company: [null, Validators.required],
      isRepeated: false,
      isInternal: false,
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

  onResized(event: ResizedEvent): void {
    this.isOpen = false;
    if (event.newRect.width < 1000) {
      this.documentRef.nativeElement.classList.add('col-half');
    } else {
      this.documentRef.nativeElement.classList.remove('col-half');
    }
  }

  cropImg(event: any, text: string) {
    if (text === 'input') {
      event.preventDefault();
      event.stopPropagation();
    }
    this.cropData = event.currentTarget.getAttribute('data-crop');
    this.cropDataItem = null;
    this.event = null;
    this.isOpen = !this.isOpen;
  }

  screenshot(event: string) {
    if (event) {
      this.ocrService.getDataFromImage(event).subscribe(r => {

        if (this.cropDataItem || this.cropDataItem === 0) {
          if (this.cropDataPackItem || this.cropDataPackItem === 0) {
            if (this.cropNumber.includes(this.cropData)) {
              this.docItems.at(this.cropDataItem).get('packItems').at(this.cropDataPackItem).get(this.cropData).patchValue(+r);
            } else {
              this.docItems.at(this.cropDataItem).get('packItems').at(this.cropDataPackItem).get(this.cropData).patchValue(r);
            }
          } else {
            if (this.cropNumber.includes(this.cropData)) {
              this.docItems.at(this.cropDataItem).get(this.cropData).patchValue(+r);
            } else {
              this.docItems.at(this.cropDataItem).get(this.cropData).patchValue(r);
            }
          }
          this.isLoading = false;
        } else {
          if (this.cropDate.includes(this.cropData)) {
            // @ts-ignore
            this.formGroup.get(this.cropData).patchValue(moment(r, 'DD.MM.YYYY'));
          } else {
            this.formGroup.get(this.cropData).patchValue(r);
          }
          this.isLoading = false;
        }
      });
    }
  }

  openChange($event: boolean) {
    this.isOpen = $event;
  }

  private getCost() {
    if (+this.route.snapshot.paramMap.get('id')) {
      this.costService.getById(+this.route.snapshot.paramMap.get('id')).subscribe(cost => {
        this.cost = cost;
        if (this.cost.packs[0]?.packItems[0]?.category) {
          this.cost.category = this.cost.packs[0].packItems[0].category;
        }
        this.loadedCost.next(this.cost);
        this.formGroup.patchValue(this.cost);
        if (this.cost?.isInternal) {
          this.formGroup.get('project').patchValue({id: null, title: 'Firemný náklad'});
        }
      });
    }

    
  }

  // change checkbox for repeated cost
  handleRepeatedCostChange(checked: boolean) {
    this.formGroup.patchValue({
      period: checked ? 'MONTH' : null,
      isInfinity: checked ? true : null,
      repeatedFrom: checked ? new Date() : null,
    });
  }

  // handle change project
  private handleChangeProject() {
    this.formGroup.get('project').valueChanges.subscribe((project: Project) => {
      if (project && project.id) {
        this.projectService.getCategories(project.id).subscribe((categories) => {
          this.categories = categories;
        });
      } else {
        this.getInternalCategories(['COMPANY', 'SALARY']);
      }
    });
  }

  getInternalCategories(groups: string[]) {
    this.categoryService.fallByGroupIn(groups, false).subscribe((nestedCategories) => {
      this.categories = nestedCategories;
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

    if (this.f.project.value && !this.f.project.value?.id) {
      this.formGroup.get('isInternal').patchValue(true);
    }

    if (this.f.isRepeated.value === true) {
      this.formGroup.patchValue({
        nextRepeatedCost: this.f.repeatedFrom.value
      });
    }

    // set cost price and total price
    this.formGroup.patchValue({
      price: this.documentHelper.price,
      totalPrice: this.documentHelper.totalPrice,
    });

    if (this.cost) {
      this.costService.updateWithFiles(this.formGroup.value, this.uploadHelper.files).subscribe(() => {
        this.router.navigate(['/paginate/costs']).then(() => {
          this.isLoading = false;
          this.uploadHelper.files = null;
          this.messageService.add('Náklad bol aktualizovaný');
        });
      }, error => {
        this.isLoading = false;
      });
    } else {
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

    
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  get docItems(): any {
    return this.formGroup.get('packs') as FormArray;
  }

  itemCrop(event: any) {
    this.isOpen = !this.isOpen;
    this.cropDataItem = event.i;
    this.cropDataPackItem = event.j;
    this.event = null;
    this.cropData = event.input.currentTarget.getAttribute('data-crop');
  }

  onUploadFile($event: boolean) {
    this.uploadFile.next(true);
  }
}
