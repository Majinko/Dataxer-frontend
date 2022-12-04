import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import { CategoryItemNode } from '../../../../../../../core/models/category-item-node';
import { Project } from '../../../../../../../core/models/project';
import { User } from '../../../../../../../core/models/user';
import { ProjectService } from '../../../../../../../core/services/project.service';
import { CategoryService } from '../../../../../../../core/services/category.service';
import { UserService } from '../../../../../../../core/services/user.service';
import { CategoryHelper } from '../../../../../../../core/class/CategoryHelper';
import {MatDialog} from '@angular/material/dialog';
import * as moment from 'moment';
import {
  DateRangeDialogComponent
} from '../../../../../../../theme/component/date-range-dialog/date-range-dialog.component';

@Component({
  selector: 'app-overview-hours-price-filter',
  templateUrl: './overview-hours-price-filter.component.html',
  styleUrls: ['./overview-hours-price-filter.component.scss']
})
export class OverviewHoursPriceFilterComponent implements OnInit {
  formGroup!: FormGroup;
  categories: CategoryItemNode[] = [];
  projects: Project[] = [];
  users: User[] = [];
  allProjects: Project[] = [];
  years: { start: string, end: string, title: string, type: string } [] = [];
  dates: { start: string, end: string, title: string, type: string }[] = [];
  options = [
    {
      name: 'Hodiny bez ceny',
      value: 'withoutPrice'
    },
    {
      name: 'Hodiny - brutto cena',
      value: 'brutto'
    },
    {
      name: 'Hodiny - netto cena',
      value: 'netto'
    }
  ];

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onFilter: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private categoryService: CategoryService,
    private categoryHelper: CategoryHelper,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      user: null,
      project: null,
      category: null,
      date: null,
      display: null,
    });
    this.formGroup.valueChanges.subscribe(() => {
      this.onFilter.emit();
    });
    this.getUsers();
    this.getProjects();
    this.prepareDates();
    this.prepareYears();
    this.getCategories();
  }

  get f() {
    return this.formGroup.controls;
  }

  doFilter() {
    if (this.formGroup.invalid) {
      console.log('chyba');

      return;
    }
    this.onFilter.emit();
  }

  /**
   * Get categories
   *
   * @private
   */
  private getCategories() {
    this.categoryService.all().subscribe((categories) => {
      this.categories = this.categoryHelper.prepareOptionTree(categories);
    });
  }

  /**
   * Get users
   *
   * @private
   */
  private getUsers() {
    this.userService.all().subscribe((users) => {
      this.users = users;
    });
  }

  /**
   * Get all projects
   * @private
   */
  private getProjects() {
    this.projectService.all().subscribe((projects) => {
      this.projects = projects.map(project => {
        project.group = 'Všetky zákazky';

        return project;
      });

      this.allProjects = this.projects;
    });
  }

  private prepareDates() {
    for (let i = 0; i <= 12; i++) {
      const monthStart: moment.Moment = moment().subtract(i, 'months').startOf('month');

      this.dates.push({
        start: moment().subtract(i, 'months').startOf('month').format('YYYY-MM-DD'),
        end: moment().subtract(i, 'months').endOf('month').format('YYYY-MM-DD'),
        title: this.getMonthData(monthStart),
        type: 'Mesiace'
      });
    }

    if (this.checkFormIsNotFill(this.formGroup.controls)) {
      this.formGroup.patchValue({
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
        this.formGroup.patchValue({
          date: {
            start: moment(dialogResult.start).format('YYYY-MM-DD'),
            end: moment(dialogResult.end).format('YYYY-MM-DD'),
            title: moment(dialogResult.start).format('DD.M.YYYY') + ' - ' + moment(dialogResult.end).format('DD.M.YYYY')
          }
        });
      }
    });
  }

  resetFilterValue(key: string) {
    this.formGroup.patchValue({ [key]: null });
  }

  checkFormIsNotFill(checkControls: { [p: string]: AbstractControl }): boolean {
    const controls = checkControls;

    for (const name in controls) {
      if (controls[name].value != null) {
        return false;
      }
    }

    return true;
  }

  getMonthData = (momentData: moment.Moment): string => {
    const date = new Date(momentData.year(), momentData.month(), momentData.date());

    return date.toLocaleString('default', {month: 'long'}) + ' ' + momentData.year();
  }
}
