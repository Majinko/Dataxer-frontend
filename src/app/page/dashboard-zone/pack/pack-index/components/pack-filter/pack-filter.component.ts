import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SearchBarService} from '../../../../../../core/services/search-bar.service';
import {FilterClass} from '../../../../../../core/class/FilterClass';

@Component({
  selector: 'app-pack-filter',
  template: ''
})
export class PackFilterComponent extends FilterClass implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    public searchbarService: SearchBarService,
  ) {
    super(searchbarService, formBuilder, 'pack', ['title'], []);
  }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({});

    this.emitFilter();
    this.createFormControls();
    this.searchBarServiceCatch();
    this.prepareData();
  }

}
