import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'notNull'
})
export class NotNullPipe implements PipeTransform {
  transform(value, ...args: any[]): any {
    return value === null ? (args[0] === 'number' ? 0 : '') : args[1] ? value + ' ' + args[1] : value;
  }
}
