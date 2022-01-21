import {Component, Injector, OnInit, Input, SimpleChanges, OnChanges} from '@angular/core';
import {FilterClass} from '../../../../../core/class/FilterClass';
import {FormBuilder} from '@angular/forms';
import {SearchBarService} from '../../../../../core/services/search-bar.service';
import {CompanyService} from '../../../../../core/services/company.service';
import {ContactService} from '../../../../../core/services/contact.service';
import {ProjectService} from '../../../../../core/services/project.service';

@Component({
  selector: 'app-global-document-filter',
  templateUrl: '../../../../../theme/component/filter/filter.component.html',
})
export class DocumentFilterComponent extends FilterClass implements OnInit, OnChanges {
  @Input() modelName: string;
  @Input() inputSearchBarValues: string[];
  @Input() inputSearchBarSelectValues: string[];

  constructor(
    public searchbarService: SearchBarService,
    public formBuilder: FormBuilder,
    protected injector: Injector,
    private companyService: CompanyService,
    private contactService: ContactService,
    private projectService: ProjectService,
  ) {
    super(
      searchbarService,
      formBuilder,
      '',
      [],
      [],
      injector
    );
  }


  ngOnInit(): void {
    this.model = this.modelName;
    this.searchBarSearchValues = this.inputSearchBarValues;
    this.searchBarSelectValues = this.inputSearchBarSelectValues;

    this.filterForm = this.formBuilder.group({
      contact: null,
      project: null,
      state: null,
      documentType: null,
      company: null,
      month: null
    });

    this.emitFilter();
    this.createFormControls();
    this.searchBarServiceCatch();
    this.prepareData();
    this.getContacts();
    this.getProjects();
    this.getCompanies();
    this.prepareMonths();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.modelName && !changes.modelName.isFirstChange()) {
      this.model = changes.modelName.currentValue;
      this.searchBarSearchValues = changes.inputSearchBarValues.currentValue;
      this.searchBarSelectValues = changes.inputSearchBarSelectValues.currentValue;

      // potrebujeme resetnut rsql filter z aktualnym modelom
      this.prepareDataForRsqlFilter(this.filterForm.value);
    }

    // iniciliziovanie metod ktore potrebujem pre kontretny typ dokumentu ... todo uplne pojde prec ked sa faktury a nakaldy spoja
    this.initFilterDataByType();
  }

  private initFilterDataByType() {
    if (this.modelName === 'cost') {
      this.clientFormControlName = 'Dodávateľ';
      this.documentTypes = [];
    }

    if (['invoice', 'cost'].includes(this.modelName)) {
      this.preparePayedStates();

      if (['cost'].includes(this.modelName)) {
        this.documentTypes = [];
      }

      if (['invoice'].includes(this.modelName)) {
        this.prepareDocumentType();
      }
    } else {
      this.payedStates = [];
      this.documentTypes = [];
    }
  }

  preparePayedStates() {
    this.payedStates = [
      {key: 'PAYED', value: 'Uhradené'},
      {key: 'UNPAID', value: 'Neuradené'},
    ];
  }

  prepareDocumentType() {
    this.documentTypes = [
      {key: 'INVOICE', value: 'Faktúra'},
      {key: 'PROFORMA', value: 'Zálohová faktúra'}
    ];
  }

  private getContacts() {
    this.contactService.allHasPriceOfferCostInvoice().subscribe((c) => {
      this.contacts = c;
    });
  }

  private getProjects() {
    this.projectService.allHasPriceOfferCostInvoice().subscribe((p) => {
      this.projects = p;
    });
  }

  private getCompanies() {
    this.companyService.all().subscribe((c) => {
      this.companies = c;
    });
  }
}
