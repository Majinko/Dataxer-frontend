import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DemandService} from '../../../../../core/services/demand.service';
import {MessageService} from '../../../../../core/services/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DocumentHelper} from '../../../../../core/class/DocumentHelper';
import {addDays, APP_DATE_FORMATS, findInvalidControls} from '../../../../../../helper';
import {Pack} from '../../../../../core/models/pack';
import {UserService} from '../../../../../core/services/user.service';
import {Demand} from '../../../../../core/models/demand';
import {NumberingService} from '../../../../../core/services/numbering.service';
import {DocumentHelperClass} from '../../../../../core/class/DocumentHelperClass';
import {BankAccountService} from '../../../../../core/services/bank-account.service';
import {ProjectService} from '../../../../../core/services/project.service';

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
  documentType: string = 'DEMAND';

  constructor(
    private formBuilder: FormBuilder,
    private demandService: DemandService,
    public route: ActivatedRoute,
    private userService: UserService,
    public documentHelper: DocumentHelper,
    protected numberingService: NumberingService,
    protected bankAccountService: BankAccountService,
    protected messageService: MessageService,
    protected projectService: ProjectService,
    protected router: Router,
  ) {
    super(bankAccountService, numberingService, messageService, router, route, projectService);
  }

  ngOnInit(): void {
    this.prepareForm();
    this.changeForm();

    if (this.route.snapshot.paramMap.get('id') === null) {
      this.prepareDemand();
    } else {
      this.checkDuplicate();
    }
  }

  // prepare form
  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      contacts: [null, Validators.required],
      project: [null, Validators.required],
      title: [null, Validators.required],
      subject: '',
      state: 'WAITING',
      company: [null, Validators.required],
      number: null,
      createdDate: [new Date(), Validators.required],
      deliveredDate: [new Date(), Validators.required],
      dueDate: [addDays(new Date(), 14)],
      note: null,
      discount: 0,
      price: 0,
      totalPrice: 0,
      documentData: this.formBuilder.group({
        user: this.formBuilder.group({
          displayName: '',
          phone: '',
          email: '',
        }),
        contact: null,
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

    this.demandService.store(this.formGroup.value).subscribe((r) => {
      this.router
        .navigate(['/document/demand'])
        .then(() => this.messageService.add('Dopyt bol vytvorený'));
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
