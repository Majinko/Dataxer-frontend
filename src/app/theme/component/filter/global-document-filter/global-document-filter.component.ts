import {Component, Injector, OnInit} from '@angular/core';
import {FilterClass} from '../../../../core/class/FilterClass';
import {FormBuilder} from '@angular/forms';
import {SearchBarService} from '../../../../core/services/search-bar.service';

@Component({
  selector: 'app-global-document-filter',
  templateUrl: './global-document-filter.component.html',
  styleUrls: ['./global-document-filter.component.scss']
})
export class GlobalDocumentFilterComponent extends FilterClass implements OnInit {

  constructor(
    public searchbarService: SearchBarService,
    public formBuilder: FormBuilder,
    protected injector: Injector
  ) {
    super(
      searchbarService,
      formBuilder,
      'priceOffer',
      ['title', 'contact.name'],
      ['contact.id', 'company.id', 'project.id', 'month'],
      injector
    );
  }

  ngOnInit(): void {
  }

}
