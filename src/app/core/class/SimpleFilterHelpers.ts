import {AbstractControl, FormGroup} from '@angular/forms';
import {CategoryHelper} from './CategoryHelper';
import {UserService} from '../services/user.service';
import {CategoryService} from '../services/category.service';
import {CategoryItemNode} from '../models/category-item-node';
import {User} from '../models/user';
import * as moment from 'moment';
import {DateRangeDialogComponent} from '../../theme/component/date-range-dialog/date-range-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class SimpleFilterHelpers {
  formGroup!: FormGroup;
  categories: CategoryItemNode[] = [];
  users: User[] = [];
  years: { start: string, end: string, title: string, type: string } [] = [];
  dates: { start: string, end: string, title: string, type: string }[] = [];

  @Output()
  public onFilter: EventEmitter<void> = new EventEmitter<void>();

    constructor(
      protected dialog: MatDialog,
      protected categoryService: CategoryService,
      protected categoryHelper: CategoryHelper,
      protected userService: UserService,
    ) { }

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
    protected getCategories() {
        this.categoryService.all().subscribe((categories) => {
            this.categories = this.categoryHelper.prepareOptionTree(categories);
        });
    }

    /**
     * Get users
     *
     * @private
     */
    protected getUsers() {
        this.userService.all().subscribe((users) => {
            this.users = users;
        });
    }

    protected prepareDates() {
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

    protected prepareYears() {
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

        return date.toLocaleString('default', { month: 'long' }) + ' ' + momentData.year();
    }

}
