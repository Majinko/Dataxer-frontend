import {FormBuilder, FormGroup} from '@angular/forms';
import {auditTime} from 'rxjs/operators';
import {SearchBarService} from '../services/search-bar.service';
import {Contact} from '../models/contact';
import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {DocumentFilter} from '../models/filters/document-filter';
import {ExpressionNode} from '@rsql/ast';
import builder from '@rsql/builder';
import {emit} from '@rsql/emitter';
import {parse} from '@rsql/parser';
import {BaseFilter} from '../models/filters/baseFilter';
import {Project} from '../models/project';
import {KeyValue} from '../models/keyValue';
import {Company} from '../models/company';
import * as moment from 'moment';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class FilterClass {
  companies: Company[] = [];
  contacts: Contact[] = [];
  projects: Project[] = [];
  payedStates: KeyValue[] = [];
  documentTypes: KeyValue[] = [];
  months: { start: string, end: string, title: string } [] = [];

  filterForm: FormGroup;
  isFiltering: boolean = false;
  orExpression: ExpressionNode[] = [];
  andExpression: ExpressionNode[] = [];
  rsQlExpression: string = '';

  // Input and Output
  @Input()
  public filterData: BaseFilter;
  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onFilter: EventEmitter<DocumentFilter> = new EventEmitter<DocumentFilter>();

  constructor(
    protected searchbarService: SearchBarService,
    protected formBuilder: FormBuilder,
    private model: string,
    private searchBarSearchValues: string[],
    private searchBarSelectValues: string[],
  ) {
  }

  prepareData() {
    this.prepareSearchBarSearchValues();

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
   * Create form controls
   * @protected
   */
  protected createFormControls() {
    this.searchBarSearchValues.forEach(qS => {
      this.filterForm.addControl(qS, this.formBuilder.control(null));
    });
  }

  /**
   * Search in fields
   * @private
   */
  protected searchBarServiceCatch() {
    this.searchbarService.appSearch.subscribe((qString) => {
      this.searchBarSearchValues.forEach((qS) => {
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
  protected emitFilter() {
    this.filterForm.valueChanges.pipe(auditTime(0)).subscribe((attr) => {
      this.checkFilterFormValue();
      this.prepareDataForRsqlFilter(this.filterForm.value);
    });
  }

  /**
   * Check value in filter is not null
   */
  protected checkFilterFormValue() {
    let somethingFiltering: number = 0;

    // tslint:disable-next-line:forin
    for (const key in this.filterForm.value) {
      somethingFiltering = 0;

      Object.keys(this.filterForm.value).forEach(attr => {
        if (!this.searchBarSearchValues.includes(attr)) {
          somethingFiltering += this.filterForm.value[attr] != null ? 1 : 0;
        }
      });
    }

    this.isFiltering = somethingFiltering > 0;
  }

  /**
   *
   * @private
   * @param filter
   */
  private prepareDataForRsqlFilter(filter: DocumentFilter) {
    this.orExpression = [];
    this.andExpression = [];

    for (const key in filter) {
      if (filter[key] !== null) {
        if (this.searchBarSearchValues.includes(key)) { // this as value from global filter
          this.orExpression.push(parse(`${this.model}.${key}=="*${this.returnCleanValue(filter[key])}*"`));
        }

        if (this.searchBarSelectValues.includes(key)) {
          if (key !== 'month') {
            this.andExpression.push(parse(`${this.model}.${key}==${filter[key]}`));
          } else {
            // todo make nicely
            this.andExpression.push(
              builder.and(builder.ge(`${this.model}.start`, filter[key].start), builder.le(`${this.model}.end`, filter[key].end))
            );
          }
        }

        if (this.searchBarSelectValues.includes(key + '.id')) {
          this.andExpression.push(parse(`${this.model}.${key + '.id'}==${filter[key].id}`));
        }
      }
    }

    this.prepareRsql();
  }

  /**
   * Prepare rsql
   * @private
   */
  private prepareRsql() {
    this.rsQlExpression = '';

    if (this.orExpression.length > 0) { // if have or expression create rsql query
      this.rsQlExpression += '(' + emit(builder.or(...this.orExpression)) + ')';
    }

    if (this.andExpression.length > 0) { // if have and expression create rsql query
      this.rsQlExpression += ((this.rsQlExpression === '' ? '(' : ';(') + emit(builder.and(...this.andExpression)) + ')');
    }

    this.onFilter.emit({documentFilter: this.filterForm.value, rsqlFilter: this.rsQlExpression});
  }

  /**
   *
   * @param filterElement
   * @private
   */
  private returnCleanValue(filterElement: any): string {
    return filterElement.replace(/[&\/\\#^+()$~%'":*?<>{},![\]]/g, '').trimLeft();
  }

  /**
   * Reset value in search bar if is clean in another component
   * @private
   */
  private prepareSearchBarSearchValues() {
    this.searchBarSearchValues.forEach((v) => {
      this.filterForm.patchValue({
        [v]: this.searchbarService.filterValue === '' ? null : this.searchbarService.filterValue
      }, {emitEvent: false});
    });
  }


  // spolocne metody ktore pouzivaju viacere filtre
  prepareMonths() {
    for (let i = 0; i <= 12; i++) {
      const monthStart: moment.Moment = moment().subtract(i, 'months').startOf('month');

      this.months.push({
        start: moment().subtract(i, 'months').startOf('month').format('YYYY-MM-DD'),
        end: moment().subtract(i, 'months').endOf('month').format('YYYY-MM-DD'),
        title: this.getMonthData(monthStart),
      });
    }

    this.filterForm.patchValue({
      month: this.months[0]
    });
  }

  private getMonthData = (momentData: moment.Moment): string => {
    const date = new Date(momentData.year(), momentData.month(), momentData.date());

    return date.toLocaleString('default', {month: 'long'}) + ' ' + momentData.year();
  };
}
