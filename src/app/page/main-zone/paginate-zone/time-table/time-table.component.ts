import {AfterViewInit, Component, LOCALE_ID, OnDestroy, OnInit} from '@angular/core';
import {TimeService} from '../../dashboard-zone/time/time.service';
import {Time} from '../../../../core/models/time';
import {merge} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {MessageService} from '../../../../core/services/message.service';
import {sum} from '../../../../../helper';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../../theme/component/confirm-dialog/confirm-dialog.component';
import {Salary} from '../../../../core/models/salary';
import {AppPaginate} from '../../../../core/class/AppPaginate';
import {ActivatedRoute} from '@angular/router';
import {GodButtonService} from '../../../../core/services/god-button.service';
import {FilterService} from '../../../../core/store/service/filter.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss'],
  providers: [
    {provide: LOCALE_ID, useValue: 'sk'}
  ]
})
export class TimeTableComponent extends AppPaginate<Time> implements OnInit, AfterViewInit, OnDestroy {
  salary: Salary;
  times: Time[] = [];
  totalTime: number = 0;
  isLoadingResults = true;
  daysPriceTime: { time: number, price: number }[] = [];
  displayedColumns: string[] = ['dateWork', 'stats', 'project', 'description', 'category', 'actions'];

  constructor(
    protected route: ActivatedRoute,
    protected godButtonService: GodButtonService,
    protected timeService: TimeService,
    protected messageService: MessageService,
    protected dialog: MatDialog,
    protected filterService: FilterService,
  ) {
    super(timeService, godButtonService, messageService, dialog, route, filterService);
  }

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.subscription = this.filterService.doFilter.subscribe(data => {
      if (data && data.filteredData) {
        this.timeService.rsqlFilter = data.rsQlFilter;

        this.paginate();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected paginate() {
    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.timeService.paginate();
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;

          this.totalTime = sum(data, 'time');
          this.price = sum(data, 'price');

          return data;
        })
      )
      .subscribe(data => {
        this.times = data;

        this.prepareTimeInDay();
      });
  }

  destroy(event: MouseEvent, id: number) {
    event.stopPropagation();

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

  /**
   * PreparedData from time
   * @private
   */
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
