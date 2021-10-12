import {Component, OnInit} from '@angular/core';
import {FilterClass} from '../../../../../../core/class/FilterClass';
import {FormBuilder} from '@angular/forms';
import {SearchBarService} from '../../../../../../core/services/search-bar.service';
import {ContactService} from '../../../../../../core/services/contact.service';
import {ProjectService} from '../../../../../../core/services/project.service';

@Component({
  selector: 'app-cost-filter',
  templateUrl: '../../../../../../theme/component/filter/filter.component.html',
})
export class CostFilterComponent extends FilterClass implements OnInit {
  constructor(
    private contactService: ContactService,
    private projectService: ProjectService,
    public formBuilder: FormBuilder,
    public searchbarService: SearchBarService,
  ) {
    super(searchbarService, formBuilder, 'cost',
      ['title', 'contact.name'],
      ['contact.id', 'project.id', 'state']
    );
  }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      contact: null,
      project: null,
      state: null
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
}
