import {Pipe, PipeTransform} from '@angular/core';
import strftime from 'strftime';

@Pipe({
  name: 'strftime'
})
export class StrftimePipe implements PipeTransform {

  transform(value: number, format: string = '%H:%M'): unknown {
    return strftime(format, new Date(value * 1000));
  }
}
