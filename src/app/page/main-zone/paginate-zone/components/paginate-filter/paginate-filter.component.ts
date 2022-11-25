import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ContactService} from '../../../../../core/services/contact.service';
import {FormBuilder} from '@angular/forms';
import {SearchBarService} from '../../../../../core/services/search-bar.service';
import {Contact} from '../../../../../core/models/contact';
import {auditTime, debounceTime} from 'rxjs/operators';
import {PaginateFilterHelper} from '../../../../../core/class/PaginateFilterHelper';
import {FilterService} from '../../../../../core/store/service/filter.service';
import {Project} from '../../../../../core/models/project';
import {Company} from '../../../../../core/models/company';
import {CategoryItemNode} from '../../../../../core/models/category-item-node';
import {ProjectService} from '../../../../../core/services/project.service';
import {CompanyService} from '../../../../../core/services/company.service';
import * as moment from 'moment';
import {checkFormIsNotFill, getMonthData} from '../../../../../../helper';
import {DateRangeDialogComponent} from '../../../../../theme/component/date-range-dialog/date-range-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {KeyValue} from '../../../../../core/models/keyValue';
import {CategoryService} from '../../../../../core/services/category.service';
import {UserService} from '../../../../../core/services/user.service';
import {CategoryHelper} from '../../../../../core/class/CategoryHelper';
import {User} from '../../../../../core/models/user';

@Component({
  selector: 'app-paginate-filter',
  templateUrl: './paginate-filter.component.html',
  styleUrls: ['./paginate-filter.component.scss']
})
// todo je tu problem ze filter sa pusta viacej krat, fix it
export class PaginateFilterComponent extends PaginateFilterHelper implements OnInit, OnChanges {
  isAdmin: boolean = false;

  users: User[] = [];
  contacts: Contact[] = [];
  projects: Project[] = [];
  companies: Company[] = [];
  allProjects: Project[] = [];
  payedStates: KeyValue[] = [];
  documentTypes: KeyValue[] = [];
  finishStates: KeyValue[] = [];
  documentRepeated: KeyValue[] = [];
  categories: CategoryItemNode[] = [];
  years: { start: string, end: string, title: string, type: string } [] = [];  /// todo dynamicky podla casov v projektoch, od prveho po posledny
  dates: { start: string, end: string, title: string, type: string } [] = [];

  constructor(
    protected searchBarService: SearchBarService,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private projectService: ProjectService,
    private companyService: CompanyService,
    private categoryService: CategoryService,
    private categoryHelper: CategoryHelper,
    private userService: UserService,
    private filterService: FilterService,
    private dialog: MatDialog
  ) {
    super();
  }

  /**
   * Init it
   */
  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      contact: null,
      project: null,
      company: null,
      contractor: null,
      documentType: null,
      finishState: null,
      start: null,
      finish: null,
      projectFinish: null,
      date: null,
      state: null,
      category: null,
      user: null,
      repeated: null, // todo
    });

    this.getDataForFilters();
    this.handeCheckChangeFilter();
    this.createFormControls();
    this.handleSearchBarService();
    this.fillFiltersIfFiltering();
    this.pathByModel();

    // only admin has right to filter other user time
    this.isAdmin = this.userService.user.roles.some(r => r.name.includes('ROLE_ADMIN'));
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
      this.getDataForFilters();

      // this set data if is time paginate
      if (this.modelName === 'time') {
        this.filterForm.patchValue({
          date: this.dates[0]
        });
      }
    }
  }

  /**
   * Reset it
   */
  resetFilterValue(key: string) {
    this.filterForm.patchValue({[key]: null});
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
   * Get data for filters
   * @private
   */
  private getDataForFilters() {
    this.getUsers();
    this.getProjects();
    this.getContacts();
    this.getCompanies();
    this.prepareDates();
    this.prepareYears();
    this.getCategories();
    this.preparePayedStates();
    this.prepareDocumentType();
    this.prepareFinishStates();
    this.prepareRepeated();
    this.handleClientChangesInFilter();
  }

  /**
   * Prepare dates for filtering
   * @private
   */
  private prepareDates() {
    for (let i = 0; i <= 12; i++) {
      const monthStart: moment.Moment = moment().subtract(i, 'months').startOf('month');

      this.dates.push({
        start: moment().subtract(i, 'months').startOf('month').format('YYYY-MM-DD'),
        end: moment().subtract(i, 'months').endOf('month').format('YYYY-MM-DD'),
        title: getMonthData(monthStart),
        type: 'Mesiace'
      });
    }

    if (this.modelName !== 'cost' && checkFormIsNotFill(this.filterForm.controls)) {
      this.filterForm.patchValue({
        date: this.dates[0]
      });
    }

    for (let i = 0; i <= 10; i++) {
      const yearStart: moment.Moment = moment().subtract(i, 'years').startOf('year');

      this.dates.push({
        start: moment().subtract(i, 'years').startOf('year').format('YYYY-MM-DD'),
        end: moment().subtract(i, 'years').endOf('year').format('YYYY-MM-DD'),
        title: 'rok ' + yearStart.format('YYYY'),
        type: 'Roky'
      });
    }
  }

  private prepareYears() {
    for (let i = 0; i <= 10; i++) {
      const yearStart: moment.Moment = moment().subtract(i, 'years').startOf('year');

      this.years.push({
        start: moment().subtract(i, 'years').startOf('year').format('YYYY-MM-DD'),
        end: moment().subtract(i, 'years').endOf('year').format('YYYY-MM-DD'),
        title: 'rok ' + yearStart.format('YYYY'),
        type: 'Roky'
      });
    }
  }

  /**
   * Prepared document states
   */
  preparePayedStates() {
    this.payedStates = [
      {key: 'PAYED', value: 'Uhradené'},
      {key: 'UNPAID', value: 'Neuradené'},
      {key: 'PARTIALLY_PAYED', value: 'Čiastočne uhradené'},
      {key: 'OVERDUE', value: 'Po splatnosti'},
    ];
  }

  /**
   * Prepared document type
   */
  prepareDocumentType() {
    this.documentTypes = [
      {key: 'INVOICE', value: 'Faktúra'},
      {key: 'PROFORMA', value: 'Zálohová faktúra'}
    ];
  }

  prepareFinishStates() {
    this.finishStates = [
      {key: true, value: 'Dokončené'},
      {key: false, value: 'Prebiehajúce'}
    ];
  }


  prepareRepeated() {
    this.documentRepeated = [
      {key: 'TRUE', value: 'Pravidelné'},
      {key: 'FALSE', value: 'Nepravidelné'}
    ];
  }

  /**
   * Detect change of client
   * @private
   */
  private handleClientChangesInFilter() {
    if (this.filterForm
      && (this.inputSearchBarSelectValues.includes('contact.id') || this.inputSearchBarSelectValues.includes('contact.id'))
      && this.inputSearchBarSelectValues.includes('project.id')
    ) {
      this.filterForm.get('contact').valueChanges.subscribe((client) => {
        if (client) {
          this.projectService.allByClient(client.id).subscribe((neProjects) => {
            const p = this.allProjects;

            neProjects.map((project) => {
              project.group = client.name;
            });

            this.projects = [];
            this.projects = neProjects.concat(p);
          });
        }
      });
    }
  }

  /**
   * Get all contacts
   */
  private getContacts() {
    if (this.inputSearchBarSelectValues.includes('contact.id') || this.inputSearchBarSelectValues.includes('contractor.id')) {
      this.contactService.all().subscribe(c => {
        this.contacts = c;
      });
    }
  }

  /**
   * Get all projects
   * @private
   */
  private getProjects() {
    if (this.inputSearchBarSelectValues.includes('project.id')) {
      this.projectService.all().subscribe((projects) => {
        this.projects = projects.map(project => {
          project.group = 'Všetky zákazky';

          return project;
        });

        this.allProjects = this.projects;
      });
    }
  }

  /**
   * Get companies
   * @private
   */
  private getCompanies() {
    if (this.inputSearchBarSelectValues.includes('company.id')) {
      this.companyService.all().subscribe((c) => {
        this.companies = c;
      });
    }
  }

  /**
   * Get categories
   *
   * @private
   */
  private getCategories() {
    if (this.inputSearchBarSelectValues.includes('category.id')) {
      this.categoryService.all().subscribe((categories) => {
        this.categories = this.categoryHelper.prepareOptionTree(categories);
      });
    }
  }

  /**
   * Get users
   *
   * @private
   */
  private getUsers() {
    if (this.inputSearchBarSelectValues.includes('user.id')) {
      this.userService.all().subscribe((users) => {
        this.users = users;
      });
    }
  }

  // Path by model
  private pathByModel() {
    if (this.modelName === 'cost') {
      this.filterForm.patchValue({
        repeated: 'FALSE'
      });
    }
  }
}
