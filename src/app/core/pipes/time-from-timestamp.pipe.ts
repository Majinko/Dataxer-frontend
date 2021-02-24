import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timeFromTimestamp'
})
export class TimeFromTimestampPipe implements PipeTransform {
  transform(value: number): string {
    const hour = Math.floor(value / 3600);
    const minutes = Math.floor((value - (hour * 3600)) / 60);

    return hour + ':' + minutes;
  }
}
