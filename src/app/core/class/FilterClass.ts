import {FormBuilder, FormGroup} from '@angular/forms';
import {auditTime} from 'rxjs/operators';
import {SearchBarService} from '../services/search-bar.service';
import {Contact} from '../models/contact';
import {Directive, EventEmitter, Injector, Input, Output} from '@angular/core';
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
import {MatDialog} from '@angular/material/dialog';
import {DateRangeDialogComponent} from '../../theme/component/date-range-dialog/date-range-dialog.component';
import {checkFormIsNotFill} from '../../../helper';
import {CategoryItemNode} from '../models/category-item-node';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class FilterClass {
  companies: Company[] = [];
  contacts: Contact[] = [];
  projects: Project[] = [];
  categories: CategoryItemNode[] = [];
  payedStates: KeyValue[] = [];
  documentTypes: KeyValue[] = [];
  months: { start: string, end: string, title: string } [] = [];

  filterForm: FormGroup;
  isFiltering: boolean = false;
  orExpression: ExpressionNode[] = [];
  andExpression: ExpressionNode[] = [];
  rsQlExpression: string = '';

  // Injector
  private dialog: MatDialog;

  // Input and Output
  @Input()
  public filterData: BaseFilter;
  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onFilter: EventEmitter<DocumentFilter> = new EventEmitter<DocumentFilter>();

  constructor(
    protected searchbarService: SearchBarService,
    protected formBuilder: FormBuilder,
    // tslint:disable-next-line:variable-name
    private _model: string,
    // tslint:disable-next-line:variable-name
    private _searchBarSearchValues: string[],
    // tslint:disable-next-line:variable-name
    private _searchBarSelectValues: string[],
    protected injector: Injector
  ) {
    this.dialog = injector.get<MatDialog>(MatDialog);
  }

  prepareData() {
    this.prepareSearchBarSearchValues();

    if (this.filterData) {
      this.filterForm.patchValue(this.filterData, {emitEvent: false});
      this.checkFilterFormValue();
    }
  }


  set model(value: string) {
    this._model = value;
  }

  set searchBarSearchValues(value: string[]) {
    this._searchBarSearchValues = value;
  }

  set searchBarSelectValues(value: string[]) {
    this._searchBarSelectValues = value;
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
   * Month range select
   */
  monthDateRange() {
    let isRangeOk: boolean = false;

    const dialogRef = this.dialog.open(DateRangeDialogComponent, {
      width: '100%',
      maxWidth: '500px',
      autoFocus: false,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      isRangeOk = Object.values(dialogResult).some(v => v != null);

      if (isRangeOk) {
        this.filterForm.patchValue({
          month: {
            start: moment(dialogResult.start).format('YYYY-MM-DD'),
            end: moment(dialogResult.end).format('YYYY-MM-DD'),
            title: moment(dialogResult.start).format('DD.M.YYYY')
          }
        });
      }
    });
  }

  /**
   * Create form controls
   * @protected
   */
  protected createFormControls() {
    this._searchBarSearchValues.forEach(qS => {
      this.filterForm.addControl(qS, this.formBuilder.control(null));
    });
  }

  /**
   * Search in fields
   * @private
   */
  protected searchBarServiceCatch() {
    this.searchbarService.appSearch.subscribe((qString) => {
      this._searchBarSearchValues.forEach((qS) => {
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
        if (!this._searchBarSearchValues.includes(attr)) {
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
  protected prepareDataForRsqlFilter(filter: DocumentFilter) {
    this.orExpression = [];
    this.andExpression = [];

    for (const key in filter) {
      if (filter[key] !== null) {
        if (this._searchBarSearchValues.includes(key)) { // this as value from global filter
          this.orExpression.push(parse(`${this._model}.${key}=="*${this.returnCleanValue(filter[key])}*"`));
        }

        if (this._searchBarSelectValues.includes(key)) {
          if (key !== 'month') {
            this.andExpression.push(parse(`${this._model}.${key}==${filter[key]}`));
          } else {
            // todo make nicely
            this.andExpression.push(
              builder.and(builder.ge(`${this._model}.start`, filter[key].start), builder.le(`${this._model}.end`, filter[key].end))
            );
          }
        }

        if (this._searchBarSelectValues.includes(key + '.id')) {
          this.andExpression.push(parse(`${this._model}.${key + '.id'}==${filter[key].id}`));
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
    this._searchBarSearchValues.forEach((v) => {
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

    if (this._model !== 'cost' && checkFormIsNotFill(this.filterForm.controls)) {
      this.filterForm.patchValue({
        month: this.months[0]
      });
    }
  }

  private getMonthData = (momentData: moment.Moment): string => {
    const date = new Date(momentData.year(), momentData.month(), momentData.date());

    return date.toLocaleString('default', {month: 'long'}) + ' ' + momentData.year();
  }
}
