import {Component, Injector, OnInit} from '@angular/core';
import {FilterClass} from '../../../../../../core/class/FilterClass';
import {FormBuilder} from '@angular/forms';
import {SearchBarService} from '../../../../../../core/services/search-bar.service';

@Component({
  selector: 'app-item-filter',
  template: '',
})
export class ItemFilterComponent extends FilterClass implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    public searchbarService: SearchBarService,
    protected injector: Injector
  ) {
    super(
      searchbarService,
      formBuilder,
      'item',
      ['code', 'title', 'manufacturer', 'contact.name'],
      [],
      injector);
  }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({});

    this.emitFilter();
    this.createFormControls();
    this.searchBarServiceCatch();
    this.prepareData();
  }
}
