import {Component, Injector, OnInit} from '@angular/core';
import {ContactService} from '../../../../../../core/services/contact.service';
import {ProjectService} from '../../../../../../core/services/project.service';
import {FormBuilder} from '@angular/forms';
import {SearchBarService} from '../../../../../../core/services/search-bar.service';
import {FilterClass} from '../../../../../../core/class/FilterClass';
import {CompanyService} from '../../../../../../core/services/company.service';
import {UserService} from '../../../../../../core/services/user.service';

@Component({
  selector: 'app-price-offer-filter',
  templateUrl: '../../../../../../theme/component/filter/filter.component.html',
})
export class PriceOfferFilterComponent extends FilterClass implements OnInit {
  constructor(
    private companyService: CompanyService,
    private contactService: ContactService,
    private projectService: ProjectService,
    public userService: UserService,
    public formBuilder: FormBuilder,
    public searchbarService: SearchBarService,
    protected injector: Injector
  ) {
    super(
      searchbarService,
      formBuilder,
      'priceOffer',
      ['title', 'contact.name'],
      ['contact.id', 'company.id', 'project.id', 'state', 'month'],
      injector
    );
  }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      contact: null,
      project: null,
      state: null,
      company: null,
      month: null
    });

    this.emitFilter();
    this.createFormControls();
    this.searchBarServiceCatch();
    this.prepareData();
    this.getContacts();
    this.getProjects();
    this.preparePayedStates();
    this.getCompanies();
    this.prepareMonths();
  }

  getContacts() {
    this.contactService.allHasPriceOffer().subscribe((c) => {
      this.contacts = c;
    });
  }

  private getProjects() {
    this.projectService.allHasPriceOffer().subscribe((p) => {
      this.projects = p;
    });
  }

  private preparePayedStates() {
    this.payedStates = [
      {key: 'PAYED', value: 'Uhradené'},
      {key: 'UNPAID', value: 'Neuradené'},
    ];
  }

  private getCompanies() {
    this.companyService.all().subscribe((c) => {
      this.companies = c;
    });
  }
}
