import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'zeroValue'
})
export class ZeroValuePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value === 0 ? '' : value;
  }

}
