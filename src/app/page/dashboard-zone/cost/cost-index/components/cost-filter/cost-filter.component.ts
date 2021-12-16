import {Component, Injector, OnInit} from '@angular/core';
import {FilterClass} from '../../../../../../core/class/FilterClass';
import {FormBuilder} from '@angular/forms';
import {SearchBarService} from '../../../../../../core/services/search-bar.service';
import {ContactService} from '../../../../../../core/services/contact.service';
import {ProjectService} from '../../../../../../core/services/project.service';
import {CompanyService} from '../../../../../../core/services/company.service';
import {COSTTYPES} from "../../../../../../core/data/costs";

@Component({
  selector: 'app-cost-filter',
  templateUrl: '../../../../../../theme/component/filter/filter.component.html',
})
export class CostFilterComponent extends FilterClass implements OnInit {
  constructor(
    private contactService: ContactService,
    private projectService: ProjectService,
    private companyService: CompanyService,
    public formBuilder: FormBuilder,
    public searchbarService: SearchBarService,
    protected injector: Injector
  ) {
    super(searchbarService, formBuilder, 'cost',
      ['title', 'contact.name'],
      ['contact.id', 'company.id', 'project.id', 'state', 'month', 'documentType'],
      injector
    );
  }

  ngOnInit(): void {
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
    this.prepareDocumentType();
    this.preparePayedStates();
    this.getCompanies();
    this.prepareMonths();
  }

  getContacts() {
    this.contactService.allHasCost().subscribe((c) => {
      this.contacts = c;
    });
  }

  getProjects() {
    this.projectService.allHasCost().subscribe((p) => {
      this.projects = p;
    });
  }

  preparePayedStates() {
    this.payedStates = [
      {key: 'PAYED', value: 'Uhradené'},
      {key: 'UNPAID', value: 'Neuradené'},
    ];
  }

  prepareDocumentType() {
    this.documentTypes = COSTTYPES;
  }


  private getCompanies() {
    this.companyService.all().subscribe((c) => {
      this.companies = c;
    });
  }
}
