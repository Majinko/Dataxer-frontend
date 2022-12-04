import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Time} from '../../../../../core/models/time';
import {Salary} from '../../../../../core/models/salary';
import {GodButtonService} from '../../../../../core/services/god-button.service';
import {TimeService} from '../../../../../core/services/time.service';
import {MessageService} from '../../../../../core/services/message.service';
import {MatDialog} from '@angular/material/dialog';
import {FilterService} from '../../../../../core/store/service/filter.service';
import {map, startWith, switchMap} from 'rxjs/operators';
import {merge} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable} from '@angular/material/table';
import {
  OverviewHoursPriceFilterComponent
} from './components/overview-hours-price-filter/overview-hours-price-filter.component';
import {OverviewService} from '../../../../../core/services/overview.service';

@Component({
  selector: 'app-overview-hours-price',
  templateUrl: './overview-hours-price.component.html',
  styleUrls: ['./overview-hours-price.component.scss']
})
export class OverviewHoursPriceComponent implements OnInit, AfterViewInit {
  salary: Salary;
  times: Time[] = [];
  pageSize: number = 15;
  pageIndex: number = 0;
  totalElements!: number;
  totalTime: number = 0;
  isLoadingResults = true;
  daysPriceTime: { time: number, price: number }[] = [];
  displayedColumns: string[] = ['user', 'dateWork', 'stats', 'project', 'description', 'category'];
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<Time>;

  @ViewChild(OverviewHoursPriceFilterComponent, {static: false})
  public auditFilterRef: OverviewHoursPriceFilterComponent | undefined;

  constructor(
    protected route: ActivatedRoute,
    protected godButtonService: GodButtonService,
    protected overviewService: OverviewService,
    protected messageService: MessageService,
    protected dialog: MatDialog,
    protected filterService: FilterService,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const auditFilter = this.auditFilterRef?.formGroup.value;
    if (this.auditFilterRef?.formGroup.valid) {
      this.paginate(auditFilter);
    }
  }

  public paginate(filter?: any) {
    if (!this.paginator) {
      return;
    }
    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.overviewService.paginateFilter(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            filter
          );
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.totalElements = data.totalElements;
          this.totalTime = data.totalTime;
          return data;
        })
      )
      .subscribe(data => {
        console.log(data.content);
        this.times = data.content;
        this.prepareTimeInDay();
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
