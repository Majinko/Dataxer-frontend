import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Contact} from '../../../../../../core/models/contact';
import {ContactService} from '../../../../../../core/services/contact.service';
import {FilterClass} from '../../../../../../core/class/FilterClass';
import {SearchBarService} from '../../../../../../core/services/search-bar.service';
import {Project} from '../../../../../../core/models/project';

@Component({
  selector: 'app-project-filter',
  templateUrl: '../../../../../../theme/component/filter/filter.component.html',
  styleUrls: ['./project-filter.component.scss']
})
export class ProjectFilterComponent extends FilterClass implements OnInit {
  contacts: Contact[] = [];

  constructor(
    private contactService: ContactService,
    public formBuilder: FormBuilder,
    public searchbarService: SearchBarService,
    protected injector: Injector
  ) {
    super(searchbarService, formBuilder, 'project', ['title', 'number', 'address', 'contact.name'], ['contact.id'], injector);
  }

  ngOnInit(): void {
    this.clientFormControlName = 'Zákazník';

    this.filterForm = this.formBuilder.group({
      contact: null,
    });

    this.emitFilter();
    this.getContacts();
    this.createFormControls();
    this.searchBarServiceCatch();
    this.prepareData();
  }

  getContacts() {
    this.contactService.allHasProject().subscribe(c => {
      this.contacts = c;
    });
  }
}
