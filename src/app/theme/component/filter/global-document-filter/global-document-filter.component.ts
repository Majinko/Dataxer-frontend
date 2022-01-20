import {Component, Injector, OnInit, Inject, Input} from '@angular/core';
import {FilterClass} from '../../../../core/class/FilterClass';
import {FormBuilder} from '@angular/forms';
import {SearchBarService} from '../../../../core/services/search-bar.service';

@Component({
  selector: 'app-global-document-filter',
  templateUrl: '../filter.component.html',
})
export class GlobalDocumentFilterComponent extends FilterClass implements OnInit {
  @Input() modelName: string;

  constructor(
    public searchbarService: SearchBarService,
    public formBuilder: FormBuilder,
    protected injector: Injector,
    @Inject('para') name: string
  ) {
    super(
      searchbarService,
      formBuilder,
      name,
      ['title', 'contact.name'],
      ['contact.id', 'company.id', 'project.id', 'state', 'documentType', 'month'],
      injector
    );
  }

  ngOnInit(): void {
  }

}
