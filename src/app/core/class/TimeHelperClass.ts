import {AbstractControl} from '@angular/forms';
import * as moment from 'moment';
import {timeRange} from '../../../helper';
import {Injectable} from '@angular/core';

export interface TimeData {
  dateWork: string;
  timeFrom: number;
  timeTo: number;
  time: number;
}

@Injectable()
export class TimeHelperClass {
  timeRange: { timesForHuman: string; timesForPc: string }[] = timeRange();
  private: TimeData;

  /**
   * Get time data for create timee
   * @param f
   * @protected
   */
  protected getTimeData(f: { [p: string]: AbstractControl }): TimeData {
    return {
      dateWork: moment(f.dateWork.value).format('YYYY-MM-DD'),
      timeFrom: moment(f.timeFromForUser.value, 'hh:mm').unix(),
      timeTo: moment(f.timeToForUser.value, 'hh:mm').unix(),
      time: moment(f.timeToForUser.value, 'hh:mm').unix() - moment(f.timeFromForUser.value, 'hh:mm').unix()
    };
  }

  /**
   * Prepare time to
   * @private
   */
  protected prepareTime(): string {
    const coefficient = 1000 * 60 * 5;

    const date = new Date();
    const rounded = new Date(Math.round(date.getTime() / coefficient) * coefficient);

    return moment(rounded).format('HH:mm');
  }

  protected _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const regex = new RegExp(filterValue + '.*', 'g');

    return this.timeRange.filter(range => range.timesForPc.replace(':', '').match(regex)).map(range => {
      return range.timesForHuman;
    });
  }
}
