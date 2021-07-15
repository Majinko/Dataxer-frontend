import {Component, LOCALE_ID, OnInit} from '@angular/core';
import {TimeService} from '../../../../../core/services/time.service';
import * as moment from 'moment';
import {Time} from '../../../../../core/models/time';
import {merge} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {MessageService} from '../../../../../core/services/message.service';
import {sum} from '../../../../../../helper';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../../../theme/component/confirm-dialog/confirm-dialog.component';
import {DocumentFilter} from '../../../../../core/models/filters/document-filter';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss'],
  providers: [
    {provide: LOCALE_ID, useValue: 'sk'}
  ]
})
export class TimeTableComponent implements OnInit {
  times: Time[] = [];
  totalPrice: number = 0;
  totalTime: number = 0;
  isLoadingResults = true;
  displayedColumns: string[] = ['dateWork', 'stats', 'project', 'description', 'category', 'actions'];

  startDate: string = moment().clone().startOf('month').format('YYYY-MM-DD');
  endDate: string = moment().clone().endOf('month').format('YYYY-MM-DD');

  constructor(
    public timeService: TimeService,
    private messageService: MessageService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.paginate();
  }

  private paginate() {
    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.timeService.allForPeriod(
            this.startDate,
            this.endDate
          );
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;

          this.totalTime = sum(data, 'time');
          this.totalPrice = sum(data, 'price');

          return data;
        })
      )
      .subscribe(data => (this.times = data));
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

  filtering(event: DocumentFilter) {
    this.timeService.filter = event;

    this.paginate();
  }
}
