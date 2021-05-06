import { Pipe, PipeTransform } from '@angular/core';
import {numberFormat} from '../../../helper';

@Pipe({
  name: 'formatPrice'
})
export class FormatPricePipe implements PipeTransform {

  transform(value: number): unknown {
    return isNaN(value) ? 0 : numberFormat(value);
  }
}
