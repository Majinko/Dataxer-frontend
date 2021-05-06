import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'addPercent'
})
export class AddPercentPipe implements PipeTransform {
  transform(value: any, ...args: any[]): number {
    const result: any = (parseFloat(value) / 100) * parseFloat(args[0] ?? 0) + parseFloat(value);

    return !isNaN(result) ? result.toFixed(2) : 0;
  }
}
