import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ContactService} from '../../../../core/services/contact.service';
import {FormBuilder} from '@angular/forms';
import {SearchBarService} from '../../../../core/services/search-bar.service';
import {Contact} from '../../../../core/models/contact';
import {auditTime, debounceTime, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../core/store/models/app-state.model';
import {PaginateFilterHelper} from '../../../../core/class/PaginateFilterHelper';
import * as FilteringActions from '../../../../core/store/actions/filter.actions';
import {FilterService} from '../../../../core/store/service/filter.service';

@Component({
  selector: 'app-paginate-filter',
  templateUrl: './paginate-filter.component.html',
  styleUrls: ['./paginate-filter.component.scss']
})
export class PaginateFilterComponent extends PaginateFilterHelper implements OnInit, OnChanges {
  contacts: Contact[];

  constructor(
    protected searchBarService: SearchBarService,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private store: Store<AppState>,
    private filterService: FilterService
  ) {
    super();
  }

  /**
   * Init it
   */
  ngOnInit(): void {
    this.getContacts();

    this.filterForm = this.formBuilder.group({
      contact: null
    });

    this.checkFormChange();
    this.createFormControls();
    this.handleSearchBarService();
    this.fillFiltersIfFiltering();
  }

  /**
   * On changes router
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.modelName.currentValue !== changes.modelName.previousValue) {

      this.modelName = changes.modelName.currentValue;
      this.inputSearchBarValues = changes.inputSearchBarValues.currentValue;
      this.inputSearchBarSelectValues = changes.inputSearchBarSelectValues.currentValue;

      // prepare rsql filter
      this.getContacts();
    }
  }

  /**
   * Reset it
   */
  resetFilterValue(key: string) {
    this.filterForm.patchValue({[key]: null});
  }

  /**
   * Add dynamic control by searchbarValues
   * @protected
   */
  protected createFormControls() {
    this.inputSearchBarValues.forEach(qS => {
      this.filterForm.addControl(qS, this.formBuilder.control(null));
    });
  }

  /**
   * PaginateFilter it
   * @private
   */
  private checkFormChange(): void {
    this.filterForm.valueChanges.pipe(auditTime(0)).subscribe(() => {
      this.filtering();
    });
  }

  /**
   * Search in fields
   * @private
   */
  protected handleSearchBarService() {
    if (this.searchBarService) {
      this.searchBarService.appSearch.pipe(debounceTime(300)).subscribe((qString) => {
        this.inputSearchBarValues.forEach((qS) => {
          this.filterForm.patchValue({
            [qS]: qString
          });
        });
      });
    }
  }

  /**
   * Store filtering object to store
   * @private
   */
  private filtering(): void {
    this.isFiltering = true;

    this.store.dispatch(new FilteringActions.FilteringActions({
      name: this.modelName,
      filteredData: this.filterForm.value,
      rsQlFilter: this.prepareRsql()
    }));
  }

  /**
   * Check filter if filtering
   * @private
   */
  private fillFiltersIfFiltering(): void {
    this.store.pipe(take(1)).subscribe(data => {
      if (data.filterStore) {
        this.isFiltering = true;
        this.filterForm.patchValue(data.filterStore.payload.filteredData, {emitEvent: false});
      }
    });
  }

  /**
   * Get all contacts
   */
  private getContacts() {
    if (this.inputSearchBarSelectValues.includes('contact.id')) {
      this.contactService.allHasProject().subscribe(c => {
        this.contacts = c;
      });
    }
  }
}
