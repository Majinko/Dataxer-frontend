import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ContactService} from '../../../../core/services/contact.service';
import {FormBuilder} from '@angular/forms';
import {SearchBarService} from '../../../../core/services/search-bar.service';
import {Contact} from '../../../../core/models/contact';
import {auditTime, debounceTime} from 'rxjs/operators';
import {PaginateFilterHelper} from '../../../../core/class/PaginateFilterHelper';
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
      contact: null,
    });

    this.handeCheckChangeFilter();
    this.createFormControls();
    this.handleSearchBarService();
    this.fillFiltersIfFiltering();
  }

  /**
   * On changes router
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.modelName.firstChange === false && changes.modelName.currentValue !== changes.modelName.previousValue) {
      this.modelName = changes.modelName.currentValue;
      this.inputSearchBarValues = changes.inputSearchBarValues.currentValue;
      this.inputSearchBarSelectValues = changes.inputSearchBarSelectValues.currentValue;

      // add controls from another components
      this.createFormControls(false);

      // change component path also values
      this.filterForm.patchValue(this.filterService.filter.filteredData);

      // path value from search bar
      this.pathValuesFromSearchBar(this.searchBarService.filterValue);

      // fetch data if is not exist
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
  private createFormControls(emitEvent: boolean = true) {
    this.inputSearchBarValues.forEach(qS => {
      this.filterForm.addControl(qS, this.formBuilder.control(null), {emitEvent});
    });
  }

  /**
   * PaginateFilter it
   * @private
   */
  private handeCheckChangeFilter(): void {
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
        this.pathValuesFromSearchBar(qString);
      });
    }
  }

  /**
   * Path value to form from search bar
   * @param value
   * @protected
   */
  protected pathValuesFromSearchBar(value: string) {
    this.inputSearchBarValues.forEach((qS) => {
      this.filterForm.patchValue({
        [qS]: value
      });
    });
  }

  /**
   * Store filtering object to store
   * @private
   */
  private filtering(): void {
    this.isFiltering = true;

    this.filterService.filter = {
      name: this.modelName,
      rsQlFilter: this.prepareRsql(),
      filteredData: this.filterForm.value
    };

    this.filterService.doFilter.next(this.filterService.filter);
  }

  /**
   * Check filter if filtering
   * @private
   */
  private fillFiltersIfFiltering(): void {
    if (this.filterService.filter) {
      this.isFiltering = true;
      this.filterService.doFilter.next(this.filterService.filter);
      this.filterForm.patchValue(this.filterService.filter.filteredData, {emitEvent: false});
    }
  }

  /**
   * Get all contacts
   */
  private getContacts() {
    if (this.inputSearchBarSelectValues.includes('contact.id')) {
      this.contactService.all().subscribe(c => {
        this.contacts = c;
      });
    }
  }
}
