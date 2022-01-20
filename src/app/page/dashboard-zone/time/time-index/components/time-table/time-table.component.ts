import {Component, LOCALE_ID, OnInit} from '@angular/core';
import {TimeService} from '../../../../../../core/services/time.service';
import {Time} from '../../../../../../core/models/time';
import {merge} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {MessageService} from '../../../../../../core/services/message.service';
import {sum} from '../../../../../../../helper';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../../../../theme/component/confirm-dialog/confirm-dialog.component';
import {DocumentFilter} from '../../../../../../core/models/filters/document-filter';
import {SalaryService} from '../../../../../../core/services/salary.service';
import {Salary} from '../../../../../../core/models/salary';
import {UserService} from '../../../../../../core/services/user.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss'],
  providers: [
    {provide: LOCALE_ID, useValue: 'sk'}
  ]
})
export class TimeTableComponent implements OnInit {
  salary: Salary;
  times: Time[] = [];
  totalPrice: number = 0;
  totalTime: number = 0;
  isLoadingResults = true;
  daysPriceTime: { time: number, price: number }[] = [];
  displayedColumns: string[] = ['dateWork', 'stats', 'project', 'description', 'category', 'actions'];

  constructor(
    public timeService: TimeService,
    private salaryService: SalaryService,
    private messageService: MessageService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    /*this.salaryService.getActiveUserSalary(this.userService.user.uid).subscribe((s) => {
      this.salary = s;
    });*/
  }

  private paginate() {
    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.timeService.allForPeriod();
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;

          this.totalTime = sum(data, 'time');
          this.totalPrice = sum(data, 'price');

          return data;
        })
      )
      .subscribe(data => {
        this.times = data;

        this.prepareTimeInDay();
      });
  }

  destroy(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.timeService.destroy(id).subscribe(() => {
          this.messageService.add('Čas bol zmazaný');

          this.times = this.times.filter(t => t.id !== id);

          this.totalTime = sum(this.times, 'time');
          this.totalPrice = sum(this.times, 'price');
        });
      }
    });
  }

  filterData(data: DocumentFilter) {
    this.timeService.filter = data.documentFilter;
    this.timeService.rsqlFilter = data.rsqlFilter;

    if (this.timeService.rsqlFilter) {
      this.paginate();
    }
  }

  private prepareTimeInDay() {
    this.daysPriceTime = [];

    this.times.forEach((time) => {
      if (!this.daysPriceTime[time.day]) {
        this.daysPriceTime[time.day] = {
          time: time.time,
          price: time.price
        };
      } else {
        this.daysPriceTime[time.day].time += time.time;
        this.daysPriceTime[time.day].price += time.price;
      }
    });
  }
}
