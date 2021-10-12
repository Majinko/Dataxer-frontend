import { Component, OnInit } from '@angular/core';
import {ContactService} from '../../../../../../core/services/contact.service';
import {ProjectService} from '../../../../../../core/services/project.service';
import {FormBuilder} from '@angular/forms';
import {SearchBarService} from '../../../../../../core/services/search-bar.service';
import {FilterClass} from '../../../../../../core/class/FilterClass';

@Component({
  selector: 'app-price-offer-filter',
  templateUrl: '../../../../../../theme/component/filter/filter.component.html',
})
export class PriceOfferFilterComponent extends FilterClass implements OnInit {
  constructor(
    private contactService: ContactService,
    private projectService: ProjectService,
    public formBuilder: FormBuilder,
    public searchbarService: SearchBarService,
  ) {
    super(searchbarService, formBuilder, 'priceOffer', ['title', 'contact.name'], ['contact.id', 'project.id', 'state']
    );
  }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      contact: null,
      project: null,
      state: null,
    });

    this.emitFilter();
    this.createFormControls();
    this.searchBarServiceCatch();
    this.prepareData();
    this.getContacts();
    this.getProjects();
    this.preparePayedStates();
  }

  getContacts() {
    this.contactService.allHasPriceOffer().subscribe((c) => {
      this.contacts = c;
    });
  }

  getProjects() {
    this.projectService.allHasPriceOffer().subscribe((p) => {
      this.projects = p;
    });
  }

  preparePayedStates() {
    this.payedStates = [
      {key: 'PAYED', value: 'Uhradené'},
      {key: 'UNPAID', value: 'Neuradené'},
    ];
  }
}
