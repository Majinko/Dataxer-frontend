import {Component, Injector, OnInit, Input, SimpleChanges, OnChanges} from '@angular/core';
import {FilterClass} from '../../../../../core/class/FilterClass';
import {FormBuilder} from '@angular/forms';
import {SearchBarService} from '../../../../../core/services/search-bar.service';
import {CompanyService} from '../../../../../core/services/company.service';
import {ContactService} from '../../../../../core/services/contact.service';
import {ProjectService} from '../../../../../core/services/project.service';
import {Project} from '../../../../../core/models/project';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-global-document-filter',
  templateUrl: '../../../../../theme/component/filter/filter.component.html',
})
export class DocumentFilterComponent extends FilterClass implements OnInit, OnChanges {
  allProjects: Project[] = [];

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
      // this value is here setting from DocumentPaginateComponent
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
      contractor: null,
      project: null,
      state: null,
      documentType: null,
      company: null,
      date: null
    });

    this.emitFilter();
    this.createFormControls();
    this.searchBarServiceCatch();
    this.prepareData();
    this.getContacts();
    this.getProjects();
    this.getCompanies();
    this.prepareDates();
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

    // odchytavanie zmeny klienta vo filtry
    this.clientChange();
  }

  private initFilterDataByType() {

    this.clientFormControlName = 'Zákazník';

    if (this.modelName === 'cost') {
      this.clientFormControlName = 'Dodávateľ';
      this.documentTypes = [];
    }

    if (['invoice', 'cost'].includes(this.modelName)) {
      this.preparePayedStates();

      if (['invoice'].includes(this.modelName)) {
        this.prepareDocumentType();
      } else {
        // ked mame naklad tak nefiltrujeme document types
        this.documentTypes = [];
      }
    } else {
      this.payedStates = [];
      this.documentTypes = [];
    }
  }

  clientChange() {
    if (this.filterForm) {
      this.filterForm.get('contact').valueChanges.pipe(first()).subscribe((client) => {
        if (client) {
          this.projectService.allByClient(client.id).subscribe((neProjects) => {
            const p = this.allProjects;

            neProjects.map((project) => {
              project.group = client.name;
            });

            this.projects = [];
            this.projects = neProjects.concat(p);
          });
        }
      });
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
    this.projectService.allHasPriceOfferCostInvoice().subscribe((projects) => {
      this.projects = projects.map(project => {
        project.group = 'Všetky zákazky';

        return project;
      });

      this.allProjects = this.projects;
    });
  }

  private getCompanies() {
    this.companyService.all().subscribe((c) => {
      this.companies = c;
    });
  }
}
