import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Contact} from '../../../core/models/contact';
import {Project} from '../../../core/models/project';
import {DocumentFilter} from '../../../core/models/filters/document-filter';
import {ContactService} from '../../../core/services/contact.service';
import {ProjectService} from '../../../core/services/project.service';
import {SearchBarService} from '../../../core/services/search-bar.service';
import {BaseFilter} from '../../../core/models/filters/baseFilter';
import {auditTime} from 'rxjs/operators';
import * as moment from 'moment';

// todo make refakt
@Component({
  selector: 'app-global-filter',
  templateUrl: './global-filter.component.html',
  styleUrls: ['./global-filter.component.scss']
})
export class GlobalFilterComponent implements OnInit {
  filterForm: FormGroup;
  contacts: Contact[] = [];
  projects: Project[] = [];
  isFiltering: boolean = false;
  payedState: { key: string, value: string }[] = [
    {key: 'PAYED', value: 'Uhradené'},
    {key: 'UNPAID', value: 'Neuradené'},
  ];
  priceOfferStates: { key: string, value: string }[] = [
    {key: 'WAITING', value: 'Čakajúca'},
    {key: 'APPROVED', value: 'Schválená'},
    {key: 'REJECTED', value: 'Zamietnutá'}
  ];
  months: { start: string, end: string, title: string } [] = [];
  documentTypes: { key: string, value: string }[] = [{key: 'INVOICE', value: 'Faktúra'}, {key: 'PROFORMA', value: 'Zálohová faktúra'}];

  @Input() public displayedColumns: string[] = []; // all to you want see
  @Input() private queryStringName: string[]; // top filter searcher
  @Input() private filterData: BaseFilter;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() private onFilter: EventEmitter<DocumentFilter> = new EventEmitter<DocumentFilter>();

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private projectService: ProjectService,
    private searchbarService: SearchBarService
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();
    this.searchBarServiceCatch();
    this.emitFilter();
    this.patchFilter();

    if (this.displayedColumns.includes('months')) {
      this.prepareMonth();
    }

    if (this.displayedColumns.includes('contact')) {
      this.getAllContacts();
    }

    if (this.displayedColumns.includes('project')) {
      this.getAllProject();
    }
  }

  /**
   * Prepare for you bro :*
   * @private
   */
  private prepareForm() {
    this.filterForm = this.formBuilder.group({
      documentType: null,
      state: null,
      contact: null,
      project: null,
    });

    this.queryStringName.forEach(qS => {
      this.filterForm.addControl(qS, this.formBuilder.control(null));
    });
  }

  /**
   * Search in fields
   * @private
   */
  private searchBarServiceCatch() {
    this.searchbarService.appSearch.subscribe((qString) => {
      this.queryStringName.forEach((qS) => {
        this.filterForm.patchValue({
          [qS]: qString
        });
      });
    });
  }

  /**
   * Emit filter
   * @private
   */
  private emitFilter() {
    this.filterForm.valueChanges.pipe(auditTime(0)).subscribe((attr) => {
      this.checkFilterFormValue();
      this.onFilter.emit(this.filterForm.value);
    });
  }

  /**
   * Path filter value
   *
   * @private
   */
  private patchFilter() {
    if (this.filterData) {
      this.filterForm.patchValue(this.filterData, {emitEvent: false});

      this.checkFilterFormValue();
    }
  }

  /**
   * Reset it
   * @param key
   */
  resetFilterValue(key: string) {
    this.filterForm.patchValue({[key]: null});

    this.checkFilterFormValue();
  }

  /**
   * Check value in filter is not null
   */
  private checkFilterFormValue() {
    let somethingFiltering: number = 0;
    const filter = ['project', 'contact', 'category', 'state', 'documentType'];

    // tslint:disable-next-line:forin
    for (const key in this.filterForm.value) {
      somethingFiltering = 0;

      Object.keys(this.filterForm.value).forEach(attr => {
        if (filter.includes(attr)) {
          somethingFiltering += this.filterForm.value[attr] != null ? 1 : 0;
        }
      });
    }

    this.isFiltering = somethingFiltering > 0;
  }

  private getAllContacts() {
    this.contactService.all().subscribe(res => {
      this.contacts = res;
    });
  }

  private getAllProject() {
    this.projectService.all().subscribe(res => {
      this.projects = res;
    });
  }

  private prepareMonth() {
    for (let i = 0; i <= 12; i++) {
      const monthStart: moment.Moment = moment().subtract(i, 'months').startOf('month');

      this.months.push({
        start: moment().subtract(i, 'months').startOf('month').format('YYYY-MM-DD'),
        end: moment().subtract(i, 'months').endOf('month').format('YYYY-MM-DD'),
        title: this.getMonthData(monthStart),
      });
    }

    this.filterForm.addControl('month', this.formBuilder.control(this.months[0]));
  }

  private getMonthData = (momentData: moment.Moment): string => {
    const date = new Date(momentData.year(), momentData.month(), momentData.date());

    return date.toLocaleString('default', {month: 'long'}) + ' ' + momentData.year();
  };

  // convenience getter for easy access to form fields
  get f() {
    return this.filterForm.controls;
  }
}
